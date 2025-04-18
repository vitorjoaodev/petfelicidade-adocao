import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import PetDetailPage from '@/views/PetDetailPage.vue';
import FavoritesPage from '@/views/FavoritesPage.vue';
import ContactPage from '@/views/ContactPage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Pet Felicidade - Find Your Perfect Pet'
    }
  },
  {
    path: '/pet/:id',
    name: 'PetDetail',
    component: PetDetailPage,
    meta: {
      title: 'Pet Details'
    }
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: FavoritesPage,
    meta: {
      title: 'Your Favorite Pets'
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: ContactPage,
    meta: {
      title: 'Contact Us'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
    meta: {
      title: 'Page Not Found'
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Set page title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Pet Felicidade';
  next();
});

export default router;
