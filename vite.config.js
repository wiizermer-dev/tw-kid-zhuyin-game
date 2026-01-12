import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  // base: '/tw-kid-zhuyin-game/', // Vercel 不需要這個，GitHub Pages 才需要
})
