import { createRouter, createWebHistory } from 'vue-router'
import OlympicHomeView from '@/views/OlympicHomeView.vue'
import AboutView from '@/views/AboutView.vue'
import DetailView from '@/views/DetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'medalHome',
      component: OlympicHomeView,
      props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') })

    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },{
      path: '/countries/:id',
      name: 'detail-view',
      component: DetailView,
      props: true
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView
    }
  ]
})

export default router
