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
    name: 'Inicio',
    component: HomeView
  },
  {
    path: '/about',
    name: 'Sobre',
    component: AboutView
  },
  {
    path: '/culture',
    name: 'Cultura de Plantio',
    component: CultureView
  },
  {
    path: '/irrigation',
    name: 'Irrigação',
    component: IrrigationTimeView
  },
  {
    path: '/plantation',
    name: 'Plantação',
    component: PlantationInfoView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
