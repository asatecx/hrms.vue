import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/login'
import People from '@/components/people'
import Company from '@/components/company/company'
import MakeAcount from '@/components/people/makeAcount'
import Uploadfile from '@/components/Uploadfile'
import PlayVideo from '@/components/company/playvideo'
import ComfirmAcount from '@/components/people/comfirmAcount'
import InterviewList from '@/components/people/interviewList'
import Case from '@/components/case'
import Persondetail from '@/components/company/persondetail'
import Myinfo from '@/components/myinfo'
import CompanyRegist from '@/components/company/companyRegist'
import CaseRegist from '@/components/case/caseRegist'
import Makeinterview from '@/components/interview/makeinterview'
import MyInterview from '@/components/interview/interviewlist'
import InterviewSuccess from '@/components/interview/success'
import comfirmMyinfo from '@/components/comfirmMyinfo'
import regist from '@/components/common/regist'
import priceandshc from '@/components/people/priceAndSchedule'
import baseinfo from '@/components/people/baseinfo'
import carearinfo from '@/components/people/carearinfo'
import skillinfo from '@/components/people/skillinfo'
import appealvideo from '@/components/people/appealvideo'
import baseinfoComfirm from '@/components/people/baseinfoComfirm'
import carearinfoComfirm from '@/components/people/carearinfoComfirm'
import skillinfoComfirm from '@/components/people/skillinfoComfirm'
import mycv from '@/components/people/myCV'
import errpage from '@/components/common/errpage'
import blankpage from '@/components/common/blankpage'
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
      path: '/baseinfo',
      name: 'baseinfo',
      component: baseinfo
    },
    {
      path: '/baseinfoComfirm',
      name: 'baseinfoComfirm',
      component: baseinfoComfirm
    },
    {
      path: '/carearinfo',
      name: 'carearinfo',
      component: carearinfo
    },
    {
      path: '/carearinfoComfirm',
      name: 'carearinfoComfirm',
      component: carearinfoComfirm
    },
    {
      path: '/skillinfo',
      name: 'skillinfo',
      component: skillinfo
    },
    {
      path: '/skillinfoComfirm',
      name: 'skillinfoComfirm',
      component: skillinfoComfirm
    },
    {
      path: '/appealvideo',
      name: 'appealvideo',
      component: appealvideo
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
      path: '/playvideo',
      name: 'playvideo',
      component: PlayVideo
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
    {
      path: '/priceandshc',
      name: 'priceandshc',
      component: priceandshc
    },
    {
      path: '/mycv',
      name: 'mycv',
      component: mycv
    },
    {
      path: '/errpage',
      name: 'errpage',
      component: errpage
    },
    {
      path: '/blankpage',
      name: 'blankpage',
      component: blankpage
    },

    
    
  ]
})
