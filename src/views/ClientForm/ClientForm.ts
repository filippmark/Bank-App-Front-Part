import { Modules } from "@/store/types";
import { useFormatter } from "@/uses/useFormatter";
import { useStore } from "@/uses/useStore";
import { reactive, ref, Ref } from "@vue/composition-api";
import { Mutations, States } from "@/store/modules/client/types";
import { Nullable } from "@/types/global";

const { useState, useMutations } = useStore(Modules.CLIENT);

interface State {
  loading: boolean;
  isBirtdayMenuOpen: boolean;
  isIssueDateOpen: boolean;
}

export const useClientForm = () => {
  const state: State = reactive<State>({
    isBirtdayMenuOpen: false,
    isIssueDateOpen: false,
    loading: false,
  });
  const clientForm: Ref<any> = ref(null);
  const { formatDateSimple } = useFormatter();
  const { client } = useState([States.client]);
  const { UPDATE_CLIENT_FIELD } = useMutations([Mutations.UPDATE_CLIENT_FIELD]);

  const updateFieldForClient = (
    field: string,
    value: string | number | boolean | Nullable
  ) => {
    UPDATE_CLIENT_FIELD({ field, value });
  };

  const updateBirthdayField = (value: string) => {
    state.isBirtdayMenuOpen = false;
    UPDATE_CLIENT_FIELD({ field: "birthDate", value });
  };

  const updateIssueDateField = (value: string) => {
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
