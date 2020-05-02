import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/login'
import People from '@/components/people'
import Company from '@/components/company/company'
import MakeAcount from '@/components/makeAcount'
import Uploadfile from '@/components/Uploadfile'
import Movie from '@/components/parts/movie'
import ComfirmAcount from '@/components/comfirmAcount'
import InterviewList from '@/components/interviewList'
import Case from '@/components/case'
import Persondetail from '@/components/persondetail'
import Myinfo from '@/components/myinfo'
import CompanyRegist from '@/components/company/companyRegist'
import CaseRegist from '@/components/case/caseRegist'
import Makeinterview from '@/components/interview/makeinterview'
import MyInterview from '@/components/interview/interviewlist'
import InterviewSuccess from '@/components/interview/success'
import comfirmMyinfo from '@/components/comfirmMyinfo'
import regist from '@/components/common/regist'

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
      path: '/company',
      name: 'company',
      component: Company
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
    {
      path: '/persondetail',
      name: 'persondetail',
      component: Persondetail
    },
    {
      path: '/myinfo',
      name: 'myinfo',
      component: Myinfo
    },
    {
      path: '/company.regist',
      name: 'company.regist',
      component: CompanyRegist
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/case/regist',
      name: 'caseRegist',
      component: CaseRegist
    },
    {
      path: '/interview/makeinterview',
      name: 'makeinterview',
      component: Makeinterview
    },
    {
      path: '/interview/interviewlist',
      name: 'interviewlist',
      component: MyInterview
    },
    {
      path: '/interview/success',
      name: 'interviewSuccess',
      component: InterviewSuccess
    },
    {
      path: '/comfirmMyinfo',
      name: 'comfirmMyinfo',
      component: comfirmMyinfo
    },
  ]
})
