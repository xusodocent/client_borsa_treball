import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Home from '../components/HomeComponent.vue'
import About from '../components/AboutComponent.vue'
import Empreses from '../components/EmpresesLlista.vue'
import Contactes from '../components/ContactesLlista.vue'
import Sectors from '../components/SectorsLlista.vue'
import Cicles from '../components/CiclesLlista.vue'
import Alumnes from '../components/AlumnesLlista.vue'
import Ofertes from '../components/OfertesLlista.vue'

import CicleForm from '../components/formularis/cicleForm.vue'
import EmpresaForm from '../components/formularis/empresaForm.vue'
import SectorForm from '../components/formularis/sectorForm.vue'
import ContacteForm from '../components/formularis/contacteForm.vue'
import AlumneForm from '../components/formularis/alumneForm.vue'
import OfertaForm from '../components/formularis/OfertaForm.vue'


import EmpresaFitxa from '../components/fitxes/fitxaEmpresa.vue'
import ContacteFitxa from '../components/fitxes/fitxaContacte.vue'
import AlumneFitxa from '../components/fitxes/fitxaAlumne.vue'

import EditaEmpresa from '../components/formularis/editempresaForm.vue'
import EditaAlumne from '../components/formularis/editAlumneForm.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/empreses',
    name: 'empreses',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Empreses
  },
  {
    path: '/contactes',
    name: 'contactes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Contactes
  },
  {
    path: '/sectors',
    name: 'sectors',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Sectors
  },
  {
    path: '/cicles',
    name: 'cicles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Cicles
  },
  {
    path: '/alumnes',
    name: 'alumnes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Alumnes
  },
  {
    path: '/ofertes',
    name: 'ofertes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Ofertes
  },
  {
    path: '/noucicle',
    name: 'noucicle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CicleForm
  },
  {
    path: '/novaempresa',
    name: 'novaempresa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EmpresaForm
  },
  {
    path: '/nousector',
    name: 'nousector',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SectorForm
  },
  {
    path: '/noucontacte',
    name: 'noucontacte',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ContacteForm
  },
  {
    path: '/noualumne',
    name: 'noualumne',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AlumneForm
  },
  {
    path: '/novaoferta',
    name: 'novaoferta',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: OfertaForm
  },
  {
    path: '/empresafitxa/:nif',
    name: 'empresafitxa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EmpresaFitxa
  },
  {
    path: '/contactefitxa/:id',
    name: 'contactefitxa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ContacteFitxa
  },
  {
    path: '/alumnefitxa/:id',
    name: 'alumnefitxa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AlumneFitxa
  },
  {
    path: '/editaempresa/:nif',
    name: 'editaempresa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EditaEmpresa
  },
  {
    path: '/editaalumne/:id',
    name: 'editaalumne',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EditaAlumne,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router