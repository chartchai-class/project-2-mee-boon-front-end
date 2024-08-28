import { createRouter, createWebHistory } from 'vue-router';
import OlympicHomeView from '@/views/OlympicHomeView.vue';
import AboutView from '@/views/AboutView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NetworkErrorView from '@/views/NetworkErrorView.vue';
import { useCountryStore } from '@/stores/countryStore';
import OlympicListView from '@/views/event/OlympicListView.vue';
import DetailList from '@/components/DetailList.vue';
import SportList from '@/components/SportList.vue';
import nProgress from 'nprogress';

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
    },
    {
      path: '/countries/:id',
      name: 'detail-view',
      component: OlympicListView,
      props: true,
      beforeEnter: async (to, from, next) => {
        const countryStore = useCountryStore();
        const countryId = parseInt(to.params.id as string);

        // Fetch the country if not already loaded
        if (!countryStore.countries.length) {
          await countryStore.fetchCountries();
        }

        // Check if the country exists
        const countryExists = countryStore.countries.some(country => country.id === countryId);

        if (countryExists) {
          next(); // Allow navigation
        } else {
          next({ name: '404-resource-view', params: { resource: 'Country' } }); // Redirect to 404
        }
      },
      children: [
        {
          path: '',
          name: 'country-detail-view',
          component: DetailList,
          props: true
        },
        {
          path: 'sportList',
          name: 'sport-list-view',
          component: SportList,
          props: true
        }
      ]
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
});

router.beforeEach(() => {
  nProgress.start();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;