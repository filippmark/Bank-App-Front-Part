import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ClientForm from "@/views/ClientForm/ClientForm.vue";
import Clients from "@/views/Clients/Clients.vue";
import Deposits from "@/views/Deposits/Deposits.vue";
import Bills from "@/views/Bills/Bills.vue";
import ClientDeposits from "@/views/ClientDeposits/ClientDeposits.vue";

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
  {
    path: "/deposits",
    name: "Deposits",
    component: Deposits,
  },
  {
    path: "/bills",
    name: "Bills",
    component: Bills,
  },
  {
    path: "/clientDeposits",
    name: "ClientDeposits",
    component: ClientDeposits,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
