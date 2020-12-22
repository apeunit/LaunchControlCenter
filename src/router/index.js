import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Events from '../views/Events.vue'
import EventsCreate from '../views/EventsCreate.vue'
import Event from '../views/Event.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/events/',
    name: 'Events',
    component: Events
  },
  {
    path: '/events/create',
    name: 'EventsCreate',
    component: EventsCreate
  },
  {
    path: '/event/:id',
    name: 'Event',
    component: Event
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (['Home','Login', 'Register', 'About'].indexOf(to.name) === -1 && !store.state.authToken) next({ name: 'Login' })
  else next()
})

export default router
