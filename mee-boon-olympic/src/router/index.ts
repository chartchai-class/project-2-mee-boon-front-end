import { createRouter, createWebHistory } from 'vue-router';
import OlympicHomeView from '@/views/OlympicHomeView.vue';
import CheerUpView from '@/components/CheerUp.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';
import SportList from '@/components/SportList.vue';
import nProgress from 'nprogress';
import AdminHomeView from '@/views/admin/adminHomeView.vue';
import EditCountryView from '@/views/admin/EditCountryView.vue';
import UserListView from '@/views/admin/UserListView.vue';
import AddCountriesView from '@/views/admin/AddCountriesView.vue';
import AdminListVeiw from '@/views/admin/AdminListVeiw.vue';
import CountryView from '@/views/CountryView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import OlympicMedalTable from '@/views/OlympicMedalTable.vue';

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
    { path: '/login', 
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
      path: '/Admin',
      name: 'admin',
      component: AdminHomeView
    },
    {
      path: '/admin/admin-list',
      name: 'admin-list',
      component: AdminListVeiw

    },
    {
      path: '/admin/edit-country',
      name: 'edit-country',
      component: EditCountryView
    },
    {
      path: '/admin/user-list',
      name: 'user-list',
      component: UserListView
    },
    {
      path: '/admin/add-country',
      name: 'add-country',
      component: AddCountriesView
    },
    {
      path: '/countries/:id',
      name: 'detail-view',
      component: OlympicMedalTable,
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
