import { Modules } from "@/store/types";
import { useFormatter } from "@/uses/useFormatter";
import { useStore } from "@/uses/useStore";
import { onUnmounted, reactive, ref, Ref } from "@vue/composition-api";
import { Mutations, States } from "@/store/modules/client/types";
import { Nullable } from "@/types/global";
import { initialStateClient } from "@/store/modules/client";

const { useState, useMutations } = useStore(Modules.CLIENT);

interface State {
  loading: boolean;
  isBirtdayMenuOpen: boolean;
  isIssueDateOpen: boolean;
  isClientFieldsChanged: boolean;
}

export const useClientForm = () => {
  const state: State = reactive<State>({
    isBirtdayMenuOpen: false,
    isIssueDateOpen: false,
    loading: false,
    isClientFieldsChanged: false,
  });
  const clientForm: Ref<any> = ref(null);
  const { formatDateSimple } = useFormatter();
  const { client } = useState([States.client]);
  const { UPDATE_CLIENT_FIELD, CLEAR_CLIENT } = useMutations([
    Mutations.UPDATE_CLIENT_FIELD,
    Mutations.CLEAR_CLIENT,
  ]);

  onUnmounted(() => {
    CLEAR_CLIENT(initialStateClient);
    state.isClientFieldsChanged = false;
  });

  const updateFieldForClient = (
    field: string,
    value: string | number | boolean | Nullable
  ) => {
    state.isClientFieldsChanged = true;
    UPDATE_CLIENT_FIELD({ field, value });
  };

  const updateBirthdayField = (value: string) => {
    state.isClientFieldsChanged = true;
    state.isBirtdayMenuOpen = false;
    UPDATE_CLIENT_FIELD({ field: "birthDate", value });
  };

  const updateIssueDateField = (value: string) => {
    state.isClientFieldsChanged = true;
    state.isIssueDateOpen = false;
    UPDATE_CLIENT_FIELD({ field: "issueDate", value });
  };

  return {
    state,
    client,
    clientForm,
    formatDateSimple,
    updateFieldForClient,
    updateBirthdayField,
    updateIssueDateField,
  };
};
