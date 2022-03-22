import { defineConfig } from 'vite';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: [
      { find: /^~/, replacement: '' },
      { find: /^symbol-icons/, replacement: '@opensumi/ide-core-browser/lib/style/icon/symbol-icons' },
      { find: /^codicons/, replacement: '@opensumi/ide-core-browser/lib/style/codicons' },
      { find: /^octicons/, replacement: '@opensumi/ide-core-browser/lib/style/octicons' },
      ...Object.entries({
        crypto: require.resolve('./polyfill/crypto.js'),
        fs: 'browserfs/dist/shims/fs.js',
        buffer: 'browserfs/dist/shims/buffer.js',
        path: 'browserfs/dist/shims/path.js',
        processGlobal: 'browserfs/dist/shims/process.js',
        bufferGlobal: 'browserfs/dist/shims/bufferGlobal.js',
        bfsGlobal: require.resolve('browserfs'),
      }).map(([find, replacement]) => ({ find, replacement })),
    ],
  },
  define: {
    'global': 'window',
  },
  esbuild: {
    jsxInject: 'import React from \'react\'',
  },
  plugins: [
    tsconfigPaths(),
    viteCommonjs(),
  ],
});
