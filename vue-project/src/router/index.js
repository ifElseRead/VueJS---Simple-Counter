import { createRouter, createWebHistory } from "vue-router";
// 1. Import the component we will use for the main route
import UserListView from "../views/UserListView.vue";

// 2. Define our routes
const router = createRouter({
  history: createWebHistory(), // Recommended history mode for modern web apps
  routes: [
    {
      path: "/",
      name: "home",
      component: { template: "<h1>Welcome Home!</h1>" }, // Simple inline component for now
    },
    {
      path: "/users",
      name: "users",
      component: UserListView, // This will be our User Fetcher page
    },
  ],
});

export default router;
