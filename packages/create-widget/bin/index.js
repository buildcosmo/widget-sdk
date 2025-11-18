#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve, basename } from 'path';
import { existsSync, mkdirSync, readFileSync, writeFileSync, cpSync } from 'fs';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function log(msg) { console.log(msg); }
function run(cmd, args, cwd) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', cwd, shell: process.platform === 'win32' });
    child.on('close', (code) => code === 0 ? resolvePromise() : reject(new Error(`${cmd} ${args.join(' ')} failed with code ${code}`)));
  });
}

async function main() {
  const [, , rawTarget] = process.argv;
  const targetDir = resolve(process.cwd(), rawTarget || '.');
  const appName = basename(targetDir);

  if (existsSync(targetDir) && existsSync(resolve(targetDir, 'package.json'))) {
    log(`\nAbort: target directory already contains a project: ${targetDir}`);
    process.exit(1);
  }
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true });
  }

  const templateDir = resolve(__dirname, '../template');

  // Copy template
  cpSync(templateDir, targetDir, { recursive: true });

  // Patch package name
  const pkgPath = resolve(targetDir, 'package.json');
  try {
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    pkg.name = appName;
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  } catch (e) {
    log('Warning: failed to set project name in package.json');
  }

  // Install deps (best-effort)
  log('\nInstalling dependencies...');
  const ua = process.env.npm_config_user_agent || '';
  const pm = ua.includes('pnpm') ? 'pnpm' : ua.includes('yarn') ? 'yarn' : 'npm';
  try {
    if (pm === 'yarn') {
      await run('yarn', ['install'], targetDir);
    } else if (pm === 'pnpm') {
      await run('pnpm', ['install'], targetDir);
    } else {
      await run('npm', ['install'], targetDir);
    }
  } catch {
    log('Install failed. You can run install manually inside the project folder.');
  }

  log(`\nDone. Next steps:\n  cd ${appName}\n  ${pm} run dev\n`);
}

main().catch((e) => { console.error(e); process.exit(1); });

