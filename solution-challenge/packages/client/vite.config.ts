import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: [
      { find: '@style', replacement: path.resolve(__dirname, 'src/core/ui-tokens') },
      { find: '@component', replacement: path.resolve(__dirname, 'src/core/business-component') },
      { find: '@rest', replacement: path.resolve(__dirname, 'src/core/rest-hook') },
      { find: '@navigation', replacement: path.resolve(__dirname, 'src/core/navigation/') },
      { find: '@page', replacement: path.resolve(__dirname, 'src/pages/') } 
    ],
  },
})