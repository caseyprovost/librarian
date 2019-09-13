import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Dashboard from './views/Dashboard.vue'
import store from '@/store'

import {
  Book,
  Author,
  Publisher
} from '@/models'

import {
  BookList,
  EditBook
} from './views/books'

import {
  AuthorList,
  EditAuthor
} from './views/authors'

import {
  PublisherList,
  EditPublisher
} from './views/publishers'

Vue.use(Router)

const requireNoUser = (to, from, next) => {
  if (store.getters.currentUser) {
    store.dispatch('setLayout', 'default-layout').then(() => {
      next('/dashboard')
    })
  } else {
    next()
  }
}

const requireUser = (to, from, next) => {
  if (!store.getters.currentUser) {
    store.dispatch('setLayout', 'authentication-layout').then(() => {
      next('/')
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
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
      component: BookList,
      beforeEnter: requireUser
    },
    {
      path: '/books/:id/edit',
      name: 'books-edit',
      component: EditBook,
      props: true,
      beforeEnter: requireUser
    },
    {
      path: '/authors',
      name: 'authors',
      component: AuthorList,
      beforeEnter: requireUser
    },
    {
      path: '/authors/:id/edit',
      name: 'authors-edit',
      component: EditAuthor,
      props: true,
      beforeEnter: requireUser
    },
    {
      path: '/publishers',
      name: 'publishers',
      component: PublisherList,
      beforeEnter: requireUser
    },
    {
      path: '/publishers/:id/edit',
      name: 'publishers-edit',
      component: EditPublisher,
      props: true,
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
