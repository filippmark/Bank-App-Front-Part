import { Modules } from "@/store/types";
import { useFormatter } from "@/uses/useFormatter";
import { useStore } from "@/uses/useStore";
import { onUnmounted, ref, Ref, onMounted } from "@vue/composition-api";
import { Actions, States } from "@/store/modules/client/types";
import VueRouter, { Route } from "vue-router";
import { Bill, ClientCredit, Credit, PaymentPlan } from "@/types/client";
import { Nullable } from "@/types/global";
import { Mutations } from "@/store/modules/error/types";
import { fetchCreditById } from "@/services/credit";
import {
  closeCredit,
  createClientCredit,
  fetchClientCredit,
  fetchClientCreditPlan,
  payPercentsCredit,
} from "@/services/clientCredit";

const { useState, useActions } = useStore(Modules.CLIENT);

export const useClientDepositForm = (router: VueRouter, route: Route) => {
  const clientDepositForm: Ref<any> = ref(null);
  const isFormValid: Ref<boolean> = ref(false);
  const creditSum: Ref<number> = ref(0);
  const credit: Ref<Credit | Nullable> = ref(null);
  const clientDepositCreating: Ref<boolean> = ref(false);
  const { formatDateSimple } = useFormatter();
  const selectedClient: Ref<string | Nullable> = ref(null);
  const isInCreatedCredit: Ref<boolean> = ref(false);
  const mainBill: Ref<Bill | Nullable> = ref(null);
  const percentBill: Ref<Bill | Nullable> = ref(null);
  const clientCredit: Ref<ClientCredit | Nullable> = ref(null);
  const plan: Ref<PaymentPlan[]> = ref([]);

  const { clients, isClientLoading } = useState([
    States.clients,
    States.isClientLoading,
  ]);
  const { LOAD_CLIENTS } = useActions([Actions.LOAD_CLIENTS]);

  const updateFields = (data: ClientCredit) => {
    clientCredit.value = data;
    isInCreatedCredit.value = true;
    credit.value = data.credit;
    creditSum.value = data.creditSum;
    selectedClient.value = data.clientId;
    mainBill.value = data.mainBill;
    percentBill.value = data.percentBill;
  };

  onMounted(async () => {
    LOAD_CLIENTS();
    if (route.name === "clientCreditInfo") {
      //
      const { data } = await fetchClientCredit(parseInt(route.params.id, 10));
      if (data) {
        updateFields(data);
      }

      const { data: paymentPlan } = await fetchClientCreditPlan(
        parseInt(route.params.id, 10)
      );

      if (paymentPlan) {
        plan.value = paymentPlan;
      }
    } else {
      const { data } = await fetchCreditById(parseInt(route.params.id, 10));
      credit.value = data;
    }
  });

  onUnmounted(() => {
    //
  });

  const isFieldNotEmpty = (value: any) => {
    return !!value || "заполните поле";
  };

  const isCreditSumLowerThanMaxSum = () => {
    if (credit.value) {
      const isValidValue =
        creditSum.value > 0 && credit.value.maxSum >= creditSum.value;
      return isValidValue || "введите другую сумму";
    }
    return "";
  };

  const hanleCreateClientCredit = async () => {
    if (credit.value && selectedClient.value) {
      clientDepositCreating.value = true;

      const { data } = await createClientCredit({
        clientId: selectedClient.value,
        creditId: credit.value.id,
        creditSum: creditSum.value,
      });

      if (data) {
        router.push({
          path: "/clientCredits/",
        });
      }

      clientDepositCreating.value = false;
    }
  };

  const percentReceiveing: Ref<boolean> = ref(false);

  const { useMutations } = useStore(Modules.ERROR_SNAPBACK);

  const { UPDATE_ERROR_MESSAGE } = useMutations([
    Mutations.UPDATE_ERROR_MESSAGE,
  ]);

  const handlePayEarnedPercents = async () => {
    //
    if (clientCredit.value) {
      percentReceiveing.value = true;

      const { data, error } = await payPercentsCredit(clientCredit.value.id);

      console.log(data, error);
      if (data) {
        updateFields(data);
      }
      if (error) {
        UPDATE_ERROR_MESSAGE([error.response.data.message]);
      }
      percentReceiveing.value = false;
    }
  };

  const creditClosing: Ref<boolean> = ref(false);

  const handleCloseCredit = async () => {
    //
    if (clientCredit.value) {
      creditClosing.value = true;

      const { data, error } = await closeCredit(clientCredit.value.id);

      console.log(data, error);
      if (data) {
        updateFields(data);
      }
      if (error) {
        UPDATE_ERROR_MESSAGE([error.response.data.message]);
      }

      creditClosing.value = false;
    }
  };

  return {
    clients,
    clientDepositForm,
    isClientLoading,
    formatDateSimple,
    hanleCreateClientCredit,
    isFieldNotEmpty,
    isFormValid,
    creditSum,
    clientDepositCreating,
    isCreditSumLowerThanMaxSum,
    credit,
    selectedClient,
    isInCreatedCredit,
    mainBill,
    percentBill,
    handlePayEarnedPercents,
    percentReceiveing,
    creditClosing,
    handleCloseCredit,
    clientCredit,
    UPDATE_ERROR_MESSAGE,
    plan,
  };
};
