import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Home from '../components/HomeComponent.vue'
import Login from '../components/LoginComponent.vue'
import Register from '../components/RegisterComponent.vue'
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
import OfertaFitxa from '../components/fitxes/fitxaOferta.vue'

import EditaEmpresa from '../components/formularis/editempresaForm.vue'
import EditaAlumne from '../components/formularis/editAlumneForm.vue'
import EditaContacte from '../components/formularis/editContacteForm.vue'
import EditaOferta from '../components/formularis/editOferta.vue'

//import VorePdf from '../components/VorePdf.vue';

import authService from '../services/authService';


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    meta: { requiresAuth: true }
  },
  {
    path: '/empreses',
    name: 'empreses',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Empreses,
    meta: { requiresAuth: true }
  },
  {
    path: '/contactes',
    name: 'contactes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Contactes,
    meta: { requiresAuth: true }
  },
  {
    path: '/sectors',
    name: 'sectors',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Sectors,
    meta: { requiresAuth: true }
  },
  {
    path: '/cicles',
    name: 'cicles',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Cicles,
    meta: { requiresAuth: true }
  },
  {
    path: '/alumnes',
    name: 'alumnes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Alumnes,
    meta: { requiresAuth: true }
  },
  {
    path: '/ofertes',
    name: 'ofertes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Ofertes,
    meta: { requiresAuth: true }
  },
  {
    path: '/noucicle',
    name: 'noucicle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: CicleForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/novaempresa',
    name: 'novaempresa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EmpresaForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/nousector',
    name: 'nousector',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: SectorForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/noucontacte',
    name: 'noucontacte',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ContacteForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/noualumne',
    name: 'noualumne',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AlumneForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/novaoferta',
    name: 'novaoferta',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: OfertaForm,
    meta: { requiresAuth: true }
  },
  {
    path: '/empresafitxa/:nif',
    name: 'empresafitxa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EmpresaFitxa,
    meta: { requiresAuth: true }
  },
  {
    path: '/contactefitxa/:id',
    name: 'contactefitxa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: ContacteFitxa,
    meta: { requiresAuth: true }
  },
  {
    path: '/alumnefitxa/:id',
    name: 'alumnefitxa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AlumneFitxa,
    meta: { requiresAuth: true }
  },
  {
    path: '/ofertafitxa/:id',
    name: 'ofertafitxa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: OfertaFitxa,
    meta: { requiresAuth: true }
  },
  {
    path: '/editaempresa/:nif',
    name: 'editaempresa',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EditaEmpresa,
    meta: { requiresAuth: true }
  },
  {
    path: '/editaalumne/:id',
    name: 'editaalumne',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EditaAlumne,
    meta: { requiresAuth: true }
  },
  {
    path: '/editacontacte/:id',
    name: 'editacontactee',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EditaContacte,
    meta: { requiresAuth: true }
  },
  {
    path: '/editaoferta/:id',
    name: 'editaoferta',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: EditaOferta,
    meta: { requiresAuth: true }
  },
 // { path: '/vorepdf/:id', component: VorePdf, name: 'vorepdf' },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!authService.isAuthenticated()) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router