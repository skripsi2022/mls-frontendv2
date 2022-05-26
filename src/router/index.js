
import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '../views/Dashboard/IndexView.vue'
import AuthView from '../views/Auth/IndexView.vue'
import SiswaView from '../views/Dashboard/Siswa/IndexView.vue'
import SiswaCreateView from '../views/Dashboard/Siswa/CreateView.vue'
import SiswaDetailView from '../views/Dashboard/Siswa/DetailView.vue'
import JurusanView from '../views/Dashboard/Jurusan/IndexView.vue'
import JurusanCreateView from '../views/Dashboard/Jurusan/CreateView.vue'
import JurusanDetailView from '../views/Dashboard/Jurusan/DetailView.vue'
import KelasCreateView from '../views/Dashboard/Kelas/CreateView.vue'
import KelasDetailView from '../views/Dashboard/Kelas/DetailView.vue'
import MapelView from '../views/Dashboard/Mapel/IndexView.vue'
import MapelCreateView from '../views/Dashboard/Mapel/CreateView.vue'
import MapelDetailView from '../views/Dashboard/Mapel/DetailView.vue'
import GuruView from '../views/Dashboard/Guru/IndexView.vue'
import GuruCreateView from '../views/Dashboard/Guru/CreateView.vue'
import GuruDetailView from '../views/Dashboard/Guru/DetailView.vue'
import UjianView from '../views/Dashboard/Ujian/IndexView.vue'
import UjianCreateView from '../views/Dashboard/Ujian/CreateView.vue'
import UjianDetailView from '../views/Dashboard/Ujian/DetailView.vue'
import SoalView from '../views/Dashboard/Soal/IndexView.vue'
import SoalCreateView from '../views/Dashboard/Soal/CreateView.vue'
import SoalDetailView from '../views/Dashboard/Soal/DetailView.vue'
import NilaiView from '../views/Dashboard/Nilai/IndexView.vue'
import NilaiCreateView from '../views/Dashboard/Nilai/CreateView.vue'
import NilaiDetailView from '../views/Dashboard/Nilai/DetailView.vue'

// GURU AREA =================================================
import MapelGuruView from '../views/Guru/Mapel/IndexView.vue'



const routes = [
  {
    path: '/',
    name: 'dashboard.index',
    component: IndexView,
    meta:{
      title : "Dashboard | Learning System Cloud Based",
    },
  },
  // Auth View =========================================
  {
    path: '/login',
    name: 'auth.index',
    component: AuthView,
    meta:{
      title : "Login | Learning System Cloud Based",
    },
  },
  // Siswa View =========================================
  {
    path: '/siswa',
    name: 'siswa.index',
    component: SiswaView,
    meta:{
      title : "Siswa | Learning System Cloud Based",
    },
  },
  {
    path: '/siswa/create',
    name: 'siswa.create',
    component: SiswaCreateView,
    meta:{
      title : "Siswa | Learning System Cloud Based",
    },
  },
  {
    path: '/siswa/detail',
    name: 'siswa.detail',
    component: SiswaDetailView,
    meta:{
      title : "Detail Siswa | Learning System Cloud Based",
    },
  },

  // Jurusan View =========================================
  {
    path: '/jurusan',
    name: 'jurusan.index',
    component: JurusanView,
    meta:{
      title : "Jurusan | Learning System Cloud Based",
    },
  },
  {
    path: '/jurusan/create',
    name: 'jurusan.create',
    component: JurusanCreateView,
    meta:{
      title : "Jurusan | Learning System Cloud Based",
    },
  },
  {
    path: '/jurusan/detail',
    name: 'jurusan.detail',
    component: JurusanDetailView,
    meta:{
      title : "Detail Jurusan | Learning System Cloud Based",
    },
  },
  {
    path: '/kelas/create',
    name: 'kelas.create',
    component: KelasCreateView,
    meta:{
      title : "Kelas | Learning System Cloud Based",
    },
  },
  {
    path: '/kelas/detail',
    name: 'kelas.detail',
    component: KelasDetailView,
    meta:{
      title : "Detail Kelas | Learning System Cloud Based",
    },
  },
  // Mapel View =========================================
  {
    path: '/mapel',
    name: 'mapel.index',
    component: MapelView,
    meta:{
      title : "Mapel | Learning System Cloud Based",
    },
  },
  {
    path: '/mapel/create',
    name: 'mapel.create',
    component: MapelCreateView,
    meta:{
      title : "Mapel | Learning System Cloud Based",
    },
  },
  {
    path: '/mapel/detail',
    name: 'mapel.detail',
    component: MapelDetailView,
    meta:{
      title : "Detail Mapel | Learning System Cloud Based",
    },
  },
  // Guru View =========================================
  {
    path: '/guru',
    name: 'guru.index',
    component: GuruView,
    meta:{
      title : "Guru | Learning System Cloud Based",
    },
  },
  {
    path: '/guru/create',
    name: 'guru.create',
    component: GuruCreateView,
    meta:{
      title : "Guru | Learning System Cloud Based",
    },
  },
  {
    path: '/guru/detail',
    name: 'guru.detail',
    component: GuruDetailView,
    meta:{
      title : "Detail Guru | Learning System Cloud Based",
    },
  },
  // Ujian View =========================================
  {
    path: '/ujian',
    name: 'ujian.index',
    component: UjianView,
    meta:{
      title : "Ujian | Learning System Cloud Based",
    },
  },
  {
    path: '/ujian/create',
    name: 'ujian.create',
    component: UjianCreateView,
    meta:{
      title : "ujian | Learning System Cloud Based",
    },
  },
  {
    path: '/ujian/detail',
    name: 'ujian.detail',
    component: UjianDetailView,
    meta:{
      title : "Detail Ujian | Learning System Cloud Based",
    },
  },
  // Nilai View =========================================
  {
    path: '/nilai',
    name: 'nilai.index',
    component: NilaiView,
    meta:{
      title : "Nilai | Learning System Cloud Based",
    },
  },
  {
    path: '/nilai/create',
    name: 'nilai.create',
    component: NilaiCreateView,
    meta:{
      title : "Nilai | Learning System Cloud Based",
    },
  },
  {
    path: '/nilai/detail',
    name: 'nilai.detail',
    component: NilaiDetailView,
    meta:{
      title : "Detail Nilai | Learning System Cloud Based",
    },
  },
  // Soal View =========================================
  {
    path: '/soal',
    name: 'soal.index',
    component: SoalView,
    meta:{
      title : "Soal | Learning System Cloud Based",
    },
  },
  {
    path: '/soal/create',
    name: 'soal.create',
    component: SoalCreateView,
    meta:{
      title : "Soal | Learning System Cloud Based",
    },
  },
  {
    path: '/soal/detail',
    name: 'soal.detail',
    component: SoalDetailView,
    meta:{
      title : "Detail Soal | Learning System Cloud Based",
    },
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }

   // GURU AREA ACCESS =========================================
   {
     path: '/guru/mapel',
      name: 'guru.mapel.index',
      component: MapelGuruView,
      meta:{
        title : "Mata Pelajaran | Learning System Cloud Based",
      },
   }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`;
  next();
})
export default router
