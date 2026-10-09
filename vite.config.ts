import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';

function buildTag() {
  try {
    const count = execSync('git rev-list --count HEAD').toString().trim();
    const sha = execSync('git rev-parse --short HEAD').toString().trim();
    return `v3.${count}+${sha}`;
  } catch {
    return 'v3-dev';
  }
}

const tag = buildTag();

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_TAG__: JSON.stringify(tag),
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
});
