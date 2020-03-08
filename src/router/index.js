import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/login'
import People from '@/components/people'
import MakeAcount from '@/components/makeAcount'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:{name:"Home"}
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login/:title',
      name: 'Login',
      component: Login
    },
    {
      path: '/people',
      name: 'People',
      component: People
    },
    {
      path: '/makeAcount',
      name: 'MakeAcount',
      component: MakeAcount
    },
  ]
})
