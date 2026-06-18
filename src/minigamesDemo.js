import { mount } from 'svelte'
import './ui/theme.css'
import MinigamesDemo from './MinigamesDemo.svelte'

const app = mount(MinigamesDemo, { target: document.getElementById('app') })
export default app
