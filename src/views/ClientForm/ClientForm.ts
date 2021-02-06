//import { Client } from "@/types/client";
import { Modules } from "@/store/types";
import { useFormatter } from "@/uses/useFormatter";
import { useStore } from "@/uses/useStore";
import { reactive, ref, Ref } from "@vue/composition-api";
import { States } from "@/store/modules/client/types";

const { useState } = useStore(Modules.CLIENT);

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

  return {
    state,
    client,
    clientForm,
    formatDateSimple,
  };
};
