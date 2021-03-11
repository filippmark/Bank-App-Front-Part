import { onMounted, ref, Ref } from "@vue/composition-api";
import { useFormatter } from "@/uses/useFormatter";
import VueRouter from "vue-router";
import { ClientCredit, ClientDeposit } from "@/types/client";
import {
  closeBankDayCredits,
  fetchClientCredits,
} from "@/services/clientCredit";

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
    value: "creditId",
    text: "creditId",
  },
  {
    value: "creditSum",
    text: "creditSum",
  },
  {
    value: "startCredit",
    text: "startCredit",
  },
  {
    value: "isClosed",
    text: "isClosed",
  },
  { text: "Actions", value: "actions", sortable: false },
];

export const useClientCredits = (router: VueRouter) => {
  const { formatDateSimple } = useFormatter();
  const clientCredits: Ref<ClientCredit[]> = ref([]);
  const isClientCreditsLoading: Ref<boolean> = ref(false);

  onMounted(async () => {
    isClientCreditsLoading.value = true;
    const { data } = await fetchClientCredits();
    if (data) {
      clientCredits.value = data;
    }
    isClientCreditsLoading.value = false;
  });

  const handleRowClick = (item: ClientDeposit) => {
    router.push({
      path: `/clientCredit/${item.id}`,
    });
  };

  const closingBankDay: Ref<boolean> = ref(false);

  const handleCloseBankDay = async () => {
    closingBankDay.value = true;

    const { data } = await closeBankDayCredits();

    console.log(data);
    if (data) {
      closingBankDay.value = false;
    }
  };

  return {
    clientCredits,
    isClientCreditsLoading,
    headers,
    formatDateSimple,
    handleRowClick,
    handleCloseBankDay,
    closingBankDay,
  };
};
