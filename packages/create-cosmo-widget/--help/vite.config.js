import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { copyFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';

function copyWidgetMeta() {
  let outDir = 'dist';
  let rootDir = process.cwd();
  return {
    name: 'copy-widget-meta',
    configResolved(config) {
      outDir = config.build.outDir;
      rootDir = config.root;
    },
    buildStart() {
      // Validate widget.config.json before build output
      const cfgPath = resolve(rootDir, 'widget.config.json');
      if (!existsSync(cfgPath)) {
        this.error('widget.config.json not found at project root.');
        return;
      }
      let cfg;
      try {
        cfg = JSON.parse(readFileSync(cfgPath, 'utf-8'));
      } catch (e) {
        this.error(`widget.config.json is not valid JSON: ${e.message}`);
        return;
      }
      const errors = validateWidgetConfig(cfg);
      if (errors.length) {
        this.error(`widget.config.json validation failed:\n- ${errors.join('\n- ')}`);
      }
    },
    closeBundle() {
      const targets = [
        'widget.config.json',
        'widget.preferences-template.json',
      ];
      const outPath = resolve(rootDir, outDir);
      mkdirSync(outPath, { recursive: true });
      for (const file of targets) {
        const src = resolve(rootDir, file);
        const dest = resolve(outPath, file);
        if (existsSync(src)) {
          copyFileSync(src, dest);
        }
      }
    },
  };
}

function validateWidgetConfig(cfg) {
  const errors = [];
  const expectType = (key, type) => {
    if (!(key in cfg)) errors.push(`${key} is required`);
    else if (typeof cfg[key] !== type) errors.push(`${key} must be ${type}`);
  };

  expectType('cosmoWidgetConfigVersion', 'string');
  expectType('defaultWidth', 'number');
  expectType('defaultHeight', 'number');
  expectType('minWidth', 'number');
  expectType('minHeight', 'number');
  expectType('allowResize', 'boolean');
  expectType('keepAspectRatio', 'boolean');
  expectType('allowLockScreen', 'boolean');
  expectType('requireSignedIn', 'boolean');

  // Basic constraints
  if (typeof cfg.defaultWidth === 'number' && cfg.defaultWidth <= 0) errors.push('defaultWidth must be > 0');
  if (typeof cfg.defaultHeight === 'number' && cfg.defaultHeight <= 0) errors.push('defaultHeight must be > 0');
  if (typeof cfg.minWidth === 'number' && typeof cfg.defaultWidth === 'number' && cfg.minWidth > cfg.defaultWidth) errors.push('minWidth must be <= defaultWidth');
  if (typeof cfg.minHeight === 'number' && typeof cfg.defaultHeight === 'number' && cfg.minHeight > cfg.defaultHeight) errors.push('minHeight must be <= defaultHeight');

  return errors;
}

export default defineConfig({
  plugins: [copyWidgetMeta()],
});


