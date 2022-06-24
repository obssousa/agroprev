import Vue from 'vue'
import VueRouter from 'vue-router'
import AboutView from '@/views/AboutView'
import CultureView from '@/views/CultureView'
import IrrigationTimeView from '@/views/IrrigationTimeView'
import PlantationInfoView from '@/views/PlantationInfoView'
import WaterBladeView from '@/views/WaterBladeView'

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
  {
    path: '/blade',
    name: 'Lâminas de Irrigação',
    component: WaterBladeView
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
