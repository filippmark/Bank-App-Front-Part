import { Modules } from "@/store/types";
import { useFormatter } from "@/uses/useFormatter";
import { useStore } from "@/uses/useStore";
import { onUnmounted, ref, Ref, onMounted } from "@vue/composition-api";
import { Actions, States } from "@/store/modules/client/types";
import VueRouter, { Route } from "vue-router";
import { Bill, ClientDeposit, Deposit } from "@/types/client";
import { Nullable } from "@/types/global";
import { fetchDepositById } from "@/services/deposits";
import {
  closeClientDeposit,
  createClientDeposit,
  fetchClientDeposit,
  getPercentsClientDeposit,
} from "@/services/clientDeposit";
import { Mutations } from "@/store/modules/error/types";

const { useState, useActions } = useStore(Modules.CLIENT);

export const useClientDepositForm = (router: VueRouter, route: Route) => {
  const clientDepositForm: Ref<any> = ref(null);
  const isFormValid: Ref<boolean> = ref(false);
  const startSum: Ref<number> = ref(0);
  const deposit: Ref<Deposit | Nullable> = ref(null);
  const clientDepositCreating: Ref<boolean> = ref(false);
  const { formatDateSimple } = useFormatter();
  const selectedClient: Ref<string | Nullable> = ref(null);
  const isInCreatedDeposit: Ref<boolean> = ref(false);
  const mainBill: Ref<Bill | Nullable> = ref(null);
  const percentBill: Ref<Bill | Nullable> = ref(null);
  const clientDeposit: Ref<ClientDeposit | Nullable> = ref(null);

  const { clients, isClientLoading } = useState([
    States.clients,
    States.isClientLoading,
  ]);
  const { LOAD_CLIENTS } = useActions([Actions.LOAD_CLIENTS]);

  const updateFields = (data: ClientDeposit) => {
    clientDeposit.value = data;
    isInCreatedDeposit.value = true;
    deposit.value = data.deposit;
    startSum.value = data.startSum;
    selectedClient.value = data.clientId;
    mainBill.value = data.mainBill;
    percentBill.value = data.percentBill;
  };

  onMounted(async () => {
    LOAD_CLIENTS();
    if (route.name === "clientDepositInfo") {
      //
      const { data } = await fetchClientDeposit(parseInt(route.params.id, 10));
      if (data) {
        updateFields(data);
      }
    } else {
      const { data } = await fetchDepositById(parseInt(route.params.id, 10));
      deposit.value = data;
    }
  });

  onUnmounted(() => {
    //
  });

  const isFieldNotEmpty = (value: any) => {
    return !!value || "заполните поле";
  };

  const isStartSumBiggerThanMinSum = () => {
    if (deposit.value) {
      return deposit.value?.minSum < startSum.value || "введите большую сумму";
    }
    return "";
  };

  const hanleCreateClientDeposit = async () => {
    if (deposit.value && selectedClient.value) {
      clientDepositCreating.value = true;

      const { data } = await createClientDeposit({
        clientId: selectedClient.value,
        depositId: deposit.value.id,
        startSum: startSum.value,
        withCapitalization: false,
      });

      if (data) {
        router.push({
          path: "/clientDeposits/",
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

  const handleGetEarnedPercents = async () => {
    //
    if (clientDeposit.value) {
      percentReceiveing.value = true;

      const { data, error } = await getPercentsClientDeposit(
        clientDeposit.value.id
      );

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

  const depositClosing: Ref<boolean> = ref(false);

  const handleCloseDeposit = async () => {
    //
    if (clientDeposit.value) {
      depositClosing.value = true;

      const { data, error } = await closeClientDeposit(clientDeposit.value.id);

      console.log(data, error);
      if (data) {
        updateFields(data);
      }
      if (error) {
        UPDATE_ERROR_MESSAGE([error.response.data.message]);
      }

      depositClosing.value = false;
    }
  };

  return {
    clients,
    clientDepositForm,
    isClientLoading,
    formatDateSimple,
    hanleCreateClientDeposit,
    isFieldNotEmpty,
    isFormValid,
    startSum,
    clientDepositCreating,
    isStartSumBiggerThanMinSum,
    deposit,
    selectedClient,
    isInCreatedDeposit,
    mainBill,
    percentBill,
    handleGetEarnedPercents,
    percentReceiveing,
    depositClosing,
    handleCloseDeposit,
    clientDeposit,
  };
};
