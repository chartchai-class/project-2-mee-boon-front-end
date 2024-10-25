import { createRouter, createWebHistory } from 'vue-router';
import OlympicHomeView from '@/views/OlympicHomeView.vue';
import CheerUpView from '@/components/CheerUp.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';
import SportList from '@/components/SportList.vue';
import nProgress from 'nprogress';
import CountryView from '@/views/CountryView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DetailList from '@/components/DetailList.vue';


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
      path: '/Register',
      name: 'register',
      component: RegisterView
    },
    { path: '/Login', 
      name: 'login', 
      component: LoginView
    },    
    {
      path: '/country/:id',
      name: 'country-view',
      component: CountryView,
      props: true,
    },
    {
      path: '/country/:id/sports',
      name: 'sport-list-view',
      component: SportList,
      props: true,
    },
    {
      path: '/cheer-up',
      name: 'cheer-up-view',
      component: CheerUpView
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If there is a saved position (e.g., using browser back/forward buttons)
      return savedPosition;
    } else if (to.hash) {
      // If navigating to a specific anchor on the page (using hash)
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      // Default scroll to top behavior
      return { top: 0, behavior: 'smooth' };
    }
  }
});

router.beforeEach(() => {
  nProgress.start();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;
