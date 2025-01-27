/// <reference types="vitest" />

import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()], // make my aliases work
  test: {
    exclude: [
      'src/components/**',
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '__tests__/**',
    ],
    maxConcurrency: 1,
    maxWorkers: 1,
    poolOptions: { threads: { minThreads: 1, maxThreads: 1 } },
  },
});
