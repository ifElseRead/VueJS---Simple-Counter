import { createRouter, createWebHistory } from "vue-router";
import MovieSearchView from "../views/MovieSearchView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "search",
      component: MovieSearchView, // Our main search page
    },
    {
      path: "/about",
      name: "about",
      // Simple view for the About page
      component: {
        template:
          "<h1>About This App</h1><p>A demonstration of core Vue.js concepts.</p>",
      },
    },
  ],
});

export default router;
