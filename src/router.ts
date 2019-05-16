import Vue from 'vue';
import Router from 'vue-router';
import search from './views/search.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'search',
      component: search,
    },
    {
      path: '/dataManage',
      name: 'dataManage',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/dataManage.vue'),
    },
  ],
});
