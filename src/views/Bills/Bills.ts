import { onMounted, ref, Ref } from "@vue/composition-api";
import { Bill } from "@/types/client";
import { fetchBills } from "@/services/bills";

const headers = [
  {
    value: "id",
    text: "id",
  },
  {
    value: "account",
    text: "account",
  },
  {
    value: "debit",
    text: "debit",
  },
  {
    value: "credit",
    text: "credit",
  },
  {
    value: "balance",
    text: "balance",
  },
  {
    value: "isActiveBill",
    text: "isActiveBill",
  },
  {
    value: "clientId",
    text: "clientId",
  },
  { text: "Actions", value: "actions", sortable: false },
];

export const useBills = () => {
  const bills: Ref<Bill[]> = ref([]);
  const isBillsLoading: Ref<boolean> = ref(false);

  onMounted(async () => {
    isBillsLoading.value = true;
    const { data } = await fetchBills();
    if (data) {
      bills.value = data;
    }
    isBillsLoading.value = false;
  });

  return {
    bills,
    isBillsLoading,
    headers,
  };
};
