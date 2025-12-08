import { createRouter, createWebHistory } from "vue-router";
import MovieSearchView from "../views/MovieSearchView.vue";
import RecipeSearchView from "../views/RecipeSearchView.vue";
import RecipeDetailsView from "../views/RecipeDetailsView.vue";

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
    {
      path: "/recipes",
      name: "recipes",
      component: RecipeSearchView, // Recipe search
    },
    {
      path: "/recipe/:id",
      name: "RecipeDetails",
      component: RecipeDetailsView, // Recipe details page
    },
  ],
});

export default router;
