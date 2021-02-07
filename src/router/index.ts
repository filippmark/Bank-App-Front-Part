import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ClientForm from "@/views/ClientForm/ClientForm.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:id",
    name: "ExistingClient",
    component: ClientForm,
  },
  {
    path: "/",
    name: "CreateClient",
    component: ClientForm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
