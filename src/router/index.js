import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/login'
import People from '@/components/people'
import MakeAcount from '@/components/makeAcount'
import Uploadfile from '@/components/Uploadfile'
import Movie from '@/components/movie'
import ComfirmAcount from '@/components/comfirmAcount'
import InterviewList from '@/components/interviewList'
import Case from '@/components/case'
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
    {
      path: '/upload',
      name: 'upload',
      component: Uploadfile
    },
    {
      path: '/movie',
      name: 'movie',
      component: Movie
    },
    {
      path: '/comfirmAcount',
      name: 'comfirmAcount',
      component: ComfirmAcount
    },
    {
      path: '/interviewList',
      name: 'interviewList',
      component: InterviewList
    },
    {
      path: '/displayCase/:id',
      name: 'displayCase',
      component: Case
    },
  ]
})
