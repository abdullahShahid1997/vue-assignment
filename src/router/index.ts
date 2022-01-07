import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  // route level code-splitting
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/post/view/:post_id",
      name: "view",
      component: () => import("../views/PostView.vue"),
    }
  ],
});

export default router;
