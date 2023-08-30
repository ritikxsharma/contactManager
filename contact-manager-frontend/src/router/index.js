import { createRouter, createWebHashHistory } from 'vue-router'
import home from "../views/Home"
import user from "../views/User"
const routes = [
  {
    path: '/',
    name: "home",
    component: home
  },
  {
    path: '/user',
    name: 'user',
    component: user
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
