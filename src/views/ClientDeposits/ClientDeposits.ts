import { onMounted, ref, Ref } from "@vue/composition-api";
import { useFormatter } from "@/uses/useFormatter";
import VueRouter from "vue-router";
import { Client, ClientDeposit } from "@/types/client";
import { fetchClientDeposits } from "@/services/clientDeposit";

const headers = [
  {
    value: "id",
    text: "id",
  },
  {
    value: "clientId",
    text: "clientId",
  },
  {
    value: "depositId",
    text: "depositId",
  },
  {
    value: "startSum",
    text: "startDate",
  },
  {
    value: "isClosed",
    text: "isClosed",
  },
  { text: "Actions", value: "actions", sortable: false },
];

export const useClientDeposits = (router: VueRouter) => {
  const { formatDateSimple } = useFormatter();
  const clientDeposits: Ref<ClientDeposit[]> = ref([]);
  const isClientDepositsLoading: Ref<boolean> = ref(false);

  onMounted(async () => {
    isClientDepositsLoading.value = true;
    const { data } = await fetchClientDeposits();
    if (data) {
      clientDeposits.value = data;
    }
    isClientDepositsLoading.value = false;
  });

  const handleRowClick = (item: Client) => {
    router.push({
      path: `/client/${item.id}`,
    });
  };

  const handleDeleteClient = async () => {
    //
  };

  return {
    clientDeposits,
    isClientDepositsLoading,
    headers,
    formatDateSimple,
    handleRowClick,
    handleDeleteClient,
  };
};
