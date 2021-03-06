import { onMounted, Ref, ref } from "@vue/composition-api";
import { useFormatter } from "@/uses/useFormatter";
import VueRouter from "vue-router";
import { Deposit } from "@/types/client";
import { fetchDeposits } from "@/services/deposits";

const headers = [
  {
    value: "id",
    text: "id",
  },
  {
    value: "isRevocable",
    text: "isRevocable",
  },
  {
    value: "percent",
    text: "percent",
  },
  {
    value: "termInMs",
    text: "termInMs",
  },
  {
    value: "minSum",
    text: "minSum",
  },
  {
    value: "currency.name",
    text: "currency",
  },
  { text: "Actions", value: "actions", sortable: false },
];

export const useDeposits = (router: VueRouter) => {
  const { formatDateSimple } = useFormatter();

  const deposits: Ref<Deposit[]> = ref([]);
  const isDepositsLoading: Ref<boolean> = ref(false);

  onMounted(async () => {
    isDepositsLoading.value = true;
    const { data } = await fetchDeposits();
    if (data) {
      deposits.value = data;
    }
    isDepositsLoading.value = false;
  });

  const handleCreateClientDeposit = async (item: Deposit) => {
    router.push({
      path: `/deposit/${item.id}`,
    });
  };

  return {
    deposits,
    isDepositsLoading,
    headers,
    formatDateSimple,
    handleCreateClientDeposit,
  };
};
