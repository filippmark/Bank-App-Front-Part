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
];

export const useClients = (router: VueRouter) => {
  const { clients, isClientLoading } = useState([
    States.clients,
    States.isClientLoading,
  ]);

  const { formatDateSimple } = useFormatter();

  onMounted(() => {
    const { LOAD_CLIENTS } = useActions([Actions.LOAD_CLIENTS]);
    LOAD_CLIENTS();
  });

  const handleRowClick = (item: Client) => {
    router.push({
      path: `/client/${item.id}`,
    });
  };

  return {
    clients,
    isClientLoading,
    headers,
    formatDateSimple,
    handleRowClick,
  };
};
