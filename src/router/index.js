import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'demoList',
    component: () => import( '../views/demoList.vue')
  },
  {
    path: '/nav',
    name: 'navView',
    component: () => import( '../views/nav.vue')
  },
  {
    path: '/customnav',
    name: 'customnavView',
    component: () => import( '../views/customnav.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
