import { Modules } from "@/store/types";
import { useFormatter } from "@/uses/useFormatter";
import { useStore } from "@/uses/useStore";
import {
  onUnmounted,
  reactive,
  ref,
  Ref,
  onMounted,
} from "@vue/composition-api";
import { Mutations, States } from "@/store/modules/client/types";
import {
  Actions as TownActions,
  States as TownStates,
} from "@/store/modules/town/types";
import {
  Actions as CitizenshipActions,
  States as CitizenshipStates,
} from "@/store/modules/citizenship/types";
import {
  Actions as DisabilityActions,
  States as DisabilityStates,
} from "@/store/modules/disability/types";
import {
  Actions as MaritalStatusActions,
  States as MaritalStatusStates,
} from "@/store/modules/maritalStatus/types";
import { Nullable } from "@/types/global";
import { initialStateClient } from "@/store/modules/client";

const { useState, useMutations } = useStore(Modules.CLIENT);

const { useState: useTownsStore, useActions: useTownsActions } = useStore(
  Modules.TOWN
);
const {
  useState: useDisabilitiesStore,
  useActions: useDisabilitiesActions,
} = useStore(Modules.DISABILITY);
const {
  useState: useMaritalStatusesStore,
  useActions: useMaritalStatusesActions,
} = useStore(Modules.MARITAL_STATUS);
const {
  useState: useCitizenhipsStore,
  useActions: useCitizenhipsActions,
} = useStore(Modules.CITIZENSHIP);

interface State {
  loading: boolean;
  isBirtdayMenuOpen: boolean;
  isIssueDateOpen: boolean;
  isClientFieldsChanged: boolean;
  isFormValid: boolean;
}

export const useClientForm = () => {
  const state: State = reactive<State>({
    isBirtdayMenuOpen: false,
    isIssueDateOpen: false,
    loading: false,
    isClientFieldsChanged: false,
    isFormValid: true,
  });
  const clientForm: Ref<any> = ref(null);
  const { formatDateSimple } = useFormatter();

  const { client } = useState([States.client]);
  const { UPDATE_CLIENT_FIELD, CLEAR_CLIENT } = useMutations([
    Mutations.UPDATE_CLIENT_FIELD,
    Mutations.CLEAR_CLIENT,
  ]);

  const { towns, isTownLoading } = useTownsStore([
    TownStates.towns,
    TownStates.isTownLoading,
  ]);
  const { LOAD_TOWNS } = useTownsActions([TownActions.LOAD_TOWNS]);

  const { citizenships, isCitizenshipsLoading } = useCitizenhipsStore([
    CitizenshipStates.citizenships,
    CitizenshipStates.isCitizenshipsLoading,
  ]);
  const { LOAD_CITIZENSHIPS } = useCitizenhipsActions([
    CitizenshipActions.LOAD_CITIZENSHIPS,
  ]);

  const { disabilities, isDisabilitiesLoading } = useDisabilitiesStore([
    DisabilityStates.disabilities,
    DisabilityStates.isDisabilitiesLoading,
  ]);
  const { LOAD_DISABILITIES } = useDisabilitiesActions([
    DisabilityActions.LOAD_DISABILITIES,
  ]);

  const {
    maritalStatuses,
    isMaritalStatusesLoading,
  } = useMaritalStatusesStore([
    MaritalStatusStates.maritalStatuses,
    MaritalStatusStates.isMaritalStatusesLoading,
  ]);
  const { LOAD_MARITAL_STATUSES } = useMaritalStatusesActions([
    MaritalStatusActions.LOAD_MARITAL_STATUSES,
  ]);

  onMounted(() => {
    LOAD_TOWNS();
    LOAD_CITIZENSHIPS();
    LOAD_DISABILITIES();
    LOAD_MARITAL_STATUSES();
  });

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

  const handleClientUpdating = () => {
    console.log("22222");
  };

  return {
    state,
    client,
    clientForm,
    formatDateSimple,
    updateFieldForClient,
    updateBirthdayField,
    updateIssueDateField,
    handleClientUpdating,
    towns,
    isTownLoading,
    citizenships,
    isCitizenshipsLoading,
    disabilities,
    isDisabilitiesLoading,
    maritalStatuses,
    isMaritalStatusesLoading,
  };
};
