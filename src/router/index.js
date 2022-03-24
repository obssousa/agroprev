import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView'
import AboutView from '@/views/AboutView'
import CultureView from '@/views/CultureView'
import IrrigationTimeView from '@/views/IrrigationTimeView'
import PlantationInfoView from '@/views/PlantationInfoView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/culture',
    name: 'culture',
    component: CultureView
  },
  {
    path: '/irrigation',
    name: 'Irrigation',
    component: IrrigationTimeView
  },
  {
    path: '/plantation',
    name: 'plantation',
    component: PlantationInfoView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
