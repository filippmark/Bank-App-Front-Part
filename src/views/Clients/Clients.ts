import { useStore } from "@/uses/useStore";
import { Modules } from "@/store/types";
import { Actions, States } from "@/store/modules/client/types";
import { onMounted } from "@vue/composition-api";
import { useFormatter } from "@/uses/useFormatter";
import VueRouter from "vue-router";
import { Client } from "@/types/client";

const { useState, useActions } = useStore(Modules.CLIENT);

const headers = [
  {
    value: "name",
    text: "ФИО",
  },
  {
    value: "birthDate",
    text: "Дата рождения",
  },
  {
    value: "passportSeries",
    text: "Серия паспорта",
  },
  {
    value: "passportNumber",
    text: "№ паспорта",
  },
  {
    value: "placeOfWork",
    text: "Место работы",
  },
  {
    value: "position",
    text: "Должность",
  },
  {
    value: "monthlyIncome",
    text: "Месячный заработок",
  },
  { text: "Actions", value: "actions", sortable: false },
];

export const useClients = (router: VueRouter) => {
  const { clients, isClientLoading } = useState([
    States.clients,
    States.isClientLoading,
  ]);

  const { formatDateSimple } = useFormatter();

  const { LOAD_CLIENTS, DELETE_CLIENT } = useActions([
    Actions.LOAD_CLIENTS,
    Actions.DELETE_CLIENT,
  ]);

  onMounted(async () => {
    await LOAD_CLIENTS();
  });

  const handleRowClick = (item: Client) => {
    router.push({
      path: `/client/${item.id}`,
    });
  };

  const handleDeleteClient = async (client: Client) => {
    await DELETE_CLIENT(client.id);
    await LOAD_CLIENTS();
  };

  return {
    clients,
    isClientLoading,
    headers,
    formatDateSimple,
    handleRowClick,
    handleDeleteClient,
  };
};
