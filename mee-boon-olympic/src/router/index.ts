import { createRouter, createWebHistory } from 'vue-router';
import OlympicHomeView from '@/views/OlympicHomeView.vue';
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
import { useAuthStore } from '@/stores/auth';
import CommentSection from '@/components/CommentSection.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      //medal-list
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
      component: AdminHomeView,
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMIN' },
    },
    {
      path: '/admin/admin-list',
      name: 'admin-list',
      component: AdminListVeiw,
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMIN' },
    },
    {
      path: '/admin/edit-country',
      name: 'edit-country',
      component: EditCountryView,
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMIN' },
    },
    {
      path: '/admin/user-list',
      name: 'user-list',
      component: UserListView,
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMIN' },
    },
    {
      path: '/admin/add-country',
      name: 'add-country',
      component: AddCountriesView,
      meta: { requiresAuth: true, requiresRole: 'ROLE_ADMIN' },
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
      component: CommentSection,
      meta: { requiresAuth: true, requiresRole: 'ROLE_USER' },

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

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Access the auth store

  // Start progress bar
  nProgress.start();

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    if (!authStore.token) {
      // If the user is not authenticated (no token), redirect to the login page
      return next({ name: 'login' });
    }

    // Check if the route requires a specific role
    if (to.meta.requiresRole && !authStore.user?.roles.includes(to.meta.requiresRole)) {
      // If the user doesn't have the required role, redirect to the home page
      return next({ name: 'medalHome' });
    }
  }

  next(); // Allow the navigation
});

router.afterEach(() => {
  nProgress.done();
});

export default router;