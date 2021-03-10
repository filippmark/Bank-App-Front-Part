import { onMounted, ref, Ref } from "@vue/composition-api";
import { useFormatter } from "@/uses/useFormatter";
import VueRouter from "vue-router";
import { ClientDeposit } from "@/types/client";
import {
  closeBankDayDeposits,
  closeBankMonthDeposits,
  fetchClientDeposits,
} from "@/services/clientDeposit";

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
    text: "startSum",
  },
  {
    value: "startDate",
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

  const handleRowClick = (item: ClientDeposit) => {
    router.push({
      path: `/clientDeposit/${item.id}`,
    });
  };

  const closingBankDay: Ref<boolean> = ref(false);

  const handleCloseBankDay = async () => {
    closingBankDay.value = true;

    const { data } = await closeBankDayDeposits();

    console.log(data);
    if (data) {
      closingBankDay.value = false;
    }
  };

  const closingBankMonth: Ref<boolean> = ref(false);

  const handleCloseBankMonth = async () => {
    closingBankMonth.value = true;

    const { data } = await closeBankMonthDeposits();

    console.log(data);
    if (data) {
      closingBankMonth.value = false;
    }
  };

  return {
    clientDeposits,
    isClientDepositsLoading,
    headers,
    formatDateSimple,
    handleRowClick,
    handleCloseBankDay,
    closingBankDay,
    closingBankMonth,
    handleCloseBankMonth,
  };
};
