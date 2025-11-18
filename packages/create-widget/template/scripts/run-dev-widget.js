#!/usr/bin/env node

/**
 * Dev workflow launcher for Cosmo widgets.
 *
 * This script boots the local Vite server and coordinates with the Cosmo
 * macOS app to preview the widget. When run in its default mode (via
 * `npm run dev`), it both starts Vite and notifies Cosmo so the widget
 * renders live on the desktop. Passing `-s/--server-only` keeps Vite running
 * without contacting Cosmo, which is useful if you just want the dev server.
 *
 * The script also mirrors a few common Vite CLI flags so developers can tweak
 * host/port/etc. without learning a separate CLI. Treat this as the primary
 * entry point for local widget development.
 */

import { spawnSync } from 'child_process';
import { resolve } from 'path';
import { createServer } from 'vite';

const widgetPath = resolve('.');

const rawArgs = process.argv.slice(2);
const serverOnlyFlags = new Set(['-s', '--server-only']);
const serverOnly = rawArgs.some((arg) => serverOnlyFlags.has(arg));
const args = rawArgs.filter((arg) => !serverOnlyFlags.has(arg));

async function start() {
  try {
    const server = await createServer(await buildViteOptions(args));
    await server.listen();
    server.printUrls();

    const devServerUrl = getDevServerUrl(server);
    if (!serverOnly) {
      console.log('Creating a dev widget on the desktop. Ensure Cosmo is running and Developer Mode is enabled.');
      notifyCosmo(widgetPath, devServerUrl);
    }

    let closing = false;
    const shutdown = async () => {
      if (closing) return;
      closing = true;
      try {
        await server.close();
      } catch (error) {
        console.error('Failed to close Vite dev server', error);
      } finally {
        process.exit(0);
      }
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
  } catch (error) {
    console.error('Failed to start dev workflow:', error);
    process.exit(1);
  }
}

start();

function getDevServerUrl(server) {
  if (server.resolvedUrls?.local?.length) {
    return server.resolvedUrls.local[0];
  }
  const address = server.httpServer?.address();
  if (address && typeof address === 'object') {
    const protocol = server.config.server?.https ? 'https' : 'http';
    const host = address.address && address.address !== '::' ? address.address : 'localhost';
    return `${protocol}://${host}:${address.port}/`;
  }
  const fallbackPort = server.config.server?.port ?? 5173;
  const protocol = server.config.server?.https ? 'https' : 'http';
  return `${protocol}://localhost:${fallbackPort}/`;
}

function notifyCosmo(widgetPath, devServerUrl) {
  const cosmoUrl = buildCosmoURL(widgetPath, devServerUrl);
  const script = `
    tell application "Cosmo"
      activate
      open location "${cosmoUrl}"
    end tell
  `;
  const result = spawnSync('osascript', ['-e', script], { stdio: 'inherit' });
  if (result.status !== 0) {
    console.warn('Failed to run widget in dev mode. Make sure Cosmo is running and Developer Mode is enabled.');
  }
}

function buildCosmoURL(widgetPath, devServerUrl) {
  const params = new URLSearchParams({
    path: widgetPath,
    server: devServerUrl,
  });
  return `cosmo://devmode?${params.toString()}`;
}

async function buildViteOptions(argv) {
  if (!argv.length) {
    return {};
  }

  const serverOptions = {};
  const overrides = {};
  let root;

  const readValue = (arg, nextValue) => {
    if (arg.includes('=')) {
      return arg.split('=').slice(1).join('=');
    }
    if (nextValue && !nextValue.startsWith('--')) {
      return nextValue;
    }
    return undefined;
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];

    if (!arg.startsWith('--')) {
      if (!root) {
        root = arg;
      }
      continue;
    }

    switch (true) {
      case arg.startsWith('--host'): {
        const value = readValue(arg, next);
        if (!arg.includes('=') && value === next) i += 1;
        if (value) {
          serverOptions.host = value;
        }
        break;
      }
      case arg.startsWith('--port'): {
        const value = readValue(arg, next);
        if (!arg.includes('=') && value === next) i += 1;
        const port = value ? Number(value) : undefined;
        if (Number.isInteger(port)) {
          serverOptions.port = port;
        }
        break;
      }
      case arg === '--https':
        serverOptions.https = true;
        break;
      case arg.startsWith('--https='): {
        const value = readValue(arg);
        if (value === 'true') {
          serverOptions.https = true;
        } else if (value === 'false') {
          serverOptions.https = false;
        }
        break;
      }
      case arg === '--open': {
        const shouldOpen = readValue(arg, next);
        if (!arg.includes('=') && shouldOpen === next) i += 1;
        serverOptions.open = shouldOpen ?? true;
        break;
      }
      case arg.startsWith('--open='): {
        const value = readValue(arg);
        serverOptions.open = value ?? true;
        break;
      }
      case arg === '--strictPort':
        serverOptions.strictPort = true;
        break;
      case arg.startsWith('--mode'): {
        const mode = readValue(arg, next);
        if (!arg.includes('=') && mode === next) i += 1;
        if (mode) {
          overrides.mode = mode;
        }
        break;
      }
      case arg.startsWith('--config'): {
        const configFile = readValue(arg, next);
        if (!arg.includes('=') && configFile === next) i += 1;
        if (configFile) {
          overrides.configFile = configFile;
        }
        break;
      }
      case arg.startsWith('--base'): {
        const base = readValue(arg, next);
        if (!arg.includes('=') && base === next) i += 1;
        if (base) {
          overrides.base = base;
        }
        break;
      }
      case arg === '--force':
        overrides.force = true;
        break;
      case arg === '--clearScreen=false':
        overrides.clearScreen = false;
        break;
      default:
        break;
    }
  }

  if (root) {
    overrides.root = root;
  }

  if (Object.keys(serverOptions).length > 0) {
    overrides.server = serverOptions;
  }

  return overrides;
}
