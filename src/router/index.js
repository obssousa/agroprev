import Vue from 'vue'
import VueRouter from 'vue-router'
import AboutView from '@/views/AboutView'
import CultureView from '@/views/CultureView'
import IrrigationTimeView from '@/views/IrrigationTimeView'
import PlantationInfoView from '@/views/PlantationInfoView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Informações de Plantio',
    component: PlantationInfoView
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
    name: 'Estimativa de Irrigação',
    component: IrrigationTimeView
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
