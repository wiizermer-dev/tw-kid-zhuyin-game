import { mount } from 'svelte'
import './ui/theme.css'
import DragonBoatDemo from './DragonBoatDemo.svelte'

const app = mount(DragonBoatDemo, {
  target: document.getElementById('app'),
})

export default app
