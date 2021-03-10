import { onMounted, Ref, ref } from "@vue/composition-api";
import { useFormatter } from "@/uses/useFormatter";
import VueRouter from "vue-router";
import { Credit, Deposit } from "@/types/client";
import { fetchCredits } from "@/services/credit";

const headers = [
  {
    value: "id",
    text: "id",
  },
  {
    value: "isAnnuity",
    text: "isAnnuity",
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
    value: "maxSum",
    text: "maxSum",
  },
  {
    value: "currency.name",
    text: "currency",
  },
  { text: "Actions", value: "actions", sortable: false },
];

export const useDeposits = (router: VueRouter) => {
  const { formatDateSimple } = useFormatter();

  const credits: Ref<Credit[]> = ref([]);
  const isCreditsLoading: Ref<boolean> = ref(false);

  onMounted(async () => {
    isCreditsLoading.value = true;
    const { data } = await fetchCredits();
    if (data) {
      credits.value = data;
    }
    isCreditsLoading.value = false;
  });

  const handleCreateClientCredit = async (item: Deposit) => {
    router.push({
      path: `/credit/${item.id}`,
    });
  };

  return {
    credits,
    isCreditsLoading,
    headers,
    formatDateSimple,
    handleCreateClientCredit,
  };
};
