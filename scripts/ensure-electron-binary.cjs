#!/usr/bin/env node
/**
 * Reliable Electron binary installer.
 *
 * Why this exists
 * ---------------
 * Electron's own postinstall relies on `extract-zip@2` -> `yauzl@2.10.0`,
 * which stalls after the first central-directory entry on this machine: the
 * install exits 0 having written almost nothing, leaving `dist/` a few hundred
 * KB with no Electron Framework and no `path.txt`, so the app cannot launch.
 * Reproduced against a 3-entry zip, so it is neither archive size nor platform.
 *
 * npm 11 also blocks install scripts by default - including this project's own
 * postinstall hook - so the binary must be fetched explicitly. Hence `npm run setup`.
 *
 * This script downloads (or reuses the cache) and extracts with the system
 * `unzip`, then writes the `path.txt` marker `electron/index.js` requires.
 * It is idempotent: it exits early when the binary is already valid.
 */

'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const https = require('https');

// Resolve the electron package from the repo root, never from this file's own
// directory: the script lives in `scripts/` but must operate on
// `node_modules/electron`, and the repo root is one level up from here.
const repoRoot = path.resolve(__dirname, '..');
const electronDir = path.join(repoRoot, 'node_modules', 'electron');
const distDir = path.join(electronDir, 'dist');

function platformPath() {
  return path.join('Electron.app', 'Contents', 'MacOS', 'Electron');
}

function version() {
  return require(path.join(electronDir, 'package.json')).version;
}

function isInstalled() {
  try {
    const marker = fs.readFileSync(path.join(electronDir, 'path.txt'), 'utf8').trim();
    if (fs.readFileSync(path.join(distDir, 'version'), 'utf8').replace(/^v/, '') !== version()) {
      return false;
    }
    return fs.existsSync(path.join(distDir, marker));
  } catch {
    return false;
  }
}

function cacheDir() {
  const custom = process.env.electron_config_cache;
  if (custom) return custom;
  if (process.platform === 'darwin') {
    return path.join(os.homedir(), 'Library', 'Caches', 'electron');
  }
  if (process.platform === 'win32') {
    return path.join(os.homedir(), 'AppData', 'Local', 'electron', 'Cache');
  }
  return path.join(os.homedir(), '.cache', 'electron');
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (target, redirects) => {
      https
        .get(target, { headers: { 'User-Agent': 'electron-installer' } }, (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            res.resume();
            if (redirects >= 5) return reject(new Error('too many redirects'));
            return get(res.headers.location, redirects + 1);
          }
          if (res.statusCode !== 200) {
            res.resume();
            return reject(new Error(`HTTP ${res.statusCode} for ${target}`));
          }
          res.pipe(file);
          file.on('finish', () => file.close(() => resolve(dest)));
        })
        .on('error', (err) => {
          fs.unlink(dest, () => reject(err));
        });
    };
    get(url, 0);
  });
}

async function main() {
  if (!fs.existsSync(path.join(electronDir, 'package.json'))) {
    throw new Error(`electron is not installed at ${electronDir} - run npm ci first`);
  }

  if (isInstalled()) {
    console.log('[electron-binary] already installed, nothing to do');
    return;
  }

  const v = version();
  const platform = process.env.npm_config_platform || process.platform;
  const arch = process.env.npm_config_arch || process.arch;
  const name = `electron-v${v}-${platform}-${arch}.zip`;
  const url = `https://github.com/electron/electron/releases/download/v${v}/${name}`;
  const cached = path.join(cacheDir(), name);

  fs.mkdirSync(path.dirname(cached), { recursive: true });
  if (fs.existsSync(cached) && fs.statSync(cached).size > 1024) {
    console.log(`[electron-binary] using cached ${name}`);
  } else {
    console.log(`[electron-binary] downloading ${name}`);
    await download(url, cached);
  }

  fs.mkdirSync(distDir, { recursive: true });
  console.log('[electron-binary] extracting with system unzip');
  execFileSync('unzip', ['-q', '-o', cached, '-d', distDir], { stdio: 'inherit' });

  const marker = platformPath();
  fs.writeFileSync(path.join(electronDir, 'path.txt'), marker);
  console.log(`[electron-binary] installed Electron ${v} -> ${marker}`);
}

main().catch((err) => {
  console.error('[electron-binary] install failed:', err.message);
  process.exit(1);
});
