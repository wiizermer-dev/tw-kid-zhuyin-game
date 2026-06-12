import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // base: '/tw-kid-zhuyin-game/', // Vercel 不需要這個，GitHub Pages 才需要
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        // 審題報告 hosted page：/ㄕㄣˇㄊㄧˊ/（從 Supabase 拉活資料，不靠快照）
        report: resolve(import.meta.dirname, 'ㄕㄣˇㄊㄧˊ/index.html')
      }
    }
  }
})
