import { createRouter, createWebHistory } from "vue-router";

import HomePage from "./pages/HomePage.vue";
import ProjectList from "./pages/ProjectList.vue";
import AboutUs from "./pages/AboutUs.vue";
import ContactUs from "./pages/ContactUs.vue";
import NotFound from "./pages/NotFound.vue";
import SingleProject from "./pages/SingleProject.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage,
    },

    {
      path: "/about",
      name: "about",
      component: AboutUs,
    },

    {
      path: "/contact",
      name: "contact",
      component: ContactUs,
    },

    {
      path: "/projects",
      name: "projects",
      component: ProjectList,
    },

    {
      path: "/projects/:slug",
      name: "single-project",
      component: SingleProject,
    },

    {
      path: "/*",
      name: "not-found",
      component: NotFound,
    },
  ],
});

export { router };
