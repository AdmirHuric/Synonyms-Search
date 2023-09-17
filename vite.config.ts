/// <reference types="vitest" />

import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), nodePolyfills()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: './tests/setup.ts'
        },
        server: {
            port: (env.PORT && Number.parseInt(env.PORT)) || 3001
        }
    };
});
