import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ClientForm from "@/views/ClientForm/ClientForm.vue";
import Clients from "@/views/Clients/Clients.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "ClientsList",
    component: Clients,
  },
  {
    path: "/client/:id",
    name: "ExistingClient",
    component: ClientForm,
  },
  {
    path: "/client",
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
