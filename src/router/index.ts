import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ClientForm from "@/views/ClientForm/ClientForm.vue";
import Clients from "@/views/Clients/Clients.vue";
import Deposits from "@/views/Deposits/Deposits.vue";
import Bills from "@/views/Bills/Bills.vue";
import ClientDeposits from "@/views/ClientDeposits/ClientDeposits.vue";
import CreateClientDeposit from "@/views/CreateCllientDeposit/CreateClientDeposit.vue";
import Credit from "@/views/Credit/Credit.vue";
import CreateClientCredit from "@/views/CreateClientCredit/CreateClientCredit.vue";
import ClientCredits from "@/views/ClientC/ClientCredits.vue";

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
  {
    path: "/deposit/:id",
    name: "createClientDeposit",
    component: CreateClientDeposit,
  },
  {
    path: "/clientDeposit/:id",
    name: "clientDepositInfo",
    component: CreateClientDeposit,
  },
  {
    path: "/credits",
    name: "credits",
    component: Credit,
  },
  {
    path: "/credit/:id",
    name: "credit",
    component: CreateClientCredit,
  },
  {
    path: "/clientCredit/:id",
    name: "clientCreditInfo",
    component: CreateClientCredit,
  },
  {
    path: "/clientCredits",
    name: "clientCredits",
    component: ClientCredits,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
