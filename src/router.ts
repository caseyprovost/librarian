import Vue from 'vue'
import Router from 'vue-router'
import Authentication from './views/Authentication.vue'
import Dashboard from './views/Dashboard.vue'
import DashboardResourceList from './views/DashboardResourceList.vue'
import { Book } from '@/models'

Vue.use(Router)

const requireNoUser = (to, from, next) => {
  if (localStorage.getItem('currentUser')) {
    next('/dashboard')
  } else {
    next()
  }
}

const requireUser = (to, from, next) => {
  if (!localStorage.getItem('currentUser')) {
    next('/')
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Authentication,
      beforeEnter: requireNoUser
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: requireUser
    },
    {
      path: '/books',
      name: 'books',
      component: DashboardResourceList,
      props: { model: Book },
      beforeEnter: requireUser
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
