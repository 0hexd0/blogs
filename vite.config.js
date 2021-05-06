import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: 'Pages',
        replacement: resolve(__dirname, './src/pages')
      },
      {
        find: 'Components',
        replacement: resolve(__dirname, './src/components')
      },
      {
        find: 'Routes',
        replacement: resolve(__dirname, './src/routes')
      },
      {
        find: 'Apis',
        replacement: resolve(__dirname, './src/apis')
      }
    ]
  }
})
