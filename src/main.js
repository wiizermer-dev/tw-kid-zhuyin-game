import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const target = document.getElementById('app')
// 清掉 index.html 內的 SEO/no-JS fallback（爬蟲看得到，真人不該看到）
target.innerHTML = ''

const app = mount(App, {
  target,
})

export default app
