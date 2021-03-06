import { Modules } from "@/store/types";
import { useFormatter } from "@/uses/useFormatter";
import { useStore } from "@/uses/useStore";
import {
  onUnmounted,
  reactive,
  ref,
  Ref,
  onMounted,
  ComputedRef,
  computed,
} from "@vue/composition-api";
import { Actions, Mutations, States } from "@/store/modules/client/types";
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
import VueRouter, { Route } from "vue-router";
import { OptionalFields } from "@/types/client";
import validator from "validator";

const { useState, useMutations, useActions } = useStore(Modules.CLIENT);

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
  isNewClient: boolean;
}

export const useClientForm = (router: VueRouter, route: Route) => {
  const state: State = reactive<State>({
    isBirtdayMenuOpen: false,
    isIssueDateOpen: false,
    loading: false,
    isClientFieldsChanged: false,
    isFormValid: true,
    isNewClient: true,
  });
  const clientForm: Ref<any> = ref(null);
  const { formatDateSimple } = useFormatter();

  const { client, isClientLoading } = useState([
    States.client,
    States.isClientLoading,
  ]);
  const { UPDATE_CLIENT_FIELD, SET_CLIENT } = useMutations([
    Mutations.UPDATE_CLIENT_FIELD,
    Mutations.SET_CLIENT,
  ]);

  const { CREATE_CLIENT, UPDATE_CLIENT, LOAD_CLIENT_DATA } = useActions([
    Actions.CREATE_CLIENT,
    Actions.UPDATE_CLIENT,
    Actions.LOAD_CLIENT_DATA,
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
    const clientId = route.params.id;
    if (clientId) {
      state.isNewClient = false;
      LOAD_CLIENT_DATA(clientId);
    }
    LOAD_TOWNS();
    LOAD_CITIZENSHIPS();
    LOAD_DISABILITIES();
    LOAD_MARITAL_STATUSES();
  });

  onUnmounted(() => {
    SET_CLIENT(initialStateClient);
  });

  const updateFieldForClient = (
    field: string,
    value: string | number | boolean | Nullable
  ) => {
    state.isClientFieldsChanged = true;
    if (
      field === "isLiableForMilitary" ||
      field === "isPensioner" ||
      field === "sex"
    ) {
      UPDATE_CLIENT_FIELD({ field, value: !!value });
    } else {
      UPDATE_CLIENT_FIELD({ field, value });
    }
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

  const handleAutocompleteChange = (
    field: string,
    value: number | Nullable
  ) => {
    state.isClientFieldsChanged = true;
    UPDATE_CLIENT_FIELD({ field, value });
  };

  const isFieldNotEmpty = (value: any) => {
    return !!value || "заполните поле";
  };

  const isEmailRule = (value: string) => {
    const isValid = value === "" || validator.isEmail(value);
    return isValid || "введите корректный email";
  };

  const isAlpha = (value: string) => {
    return (
      validator.isAlpha(value, "ru-RU") || "введите слово, используя алфавит"
    );
  };

  const isPassportNumber = (value: string) => {
    return validator.isPassportNumber(value, "BY") || "некорректно";
  };

  const isAlphanumeric = (value: string) => {
    return validator.isAlphanumeric(value) || "некорректно";
  };

  const isMobilePhone = (value: string) => {
    const isValid = value === "" || validator.isMobilePhone(value, "be-BY");
    return isValid || "некорректно";
  };

  const isNumeric = (value: string) => {
    const isValid = value === "" || validator.isNumeric(value);
    return isValid || "некорректно";
  };

  const removeOptionalFalseFields = () => {
    const fieldNames = Object.values(OptionalFields);
    const preparedClient = { ...client.value };
    fieldNames.forEach((fieldName) => {
      if (!preparedClient[fieldName]) {
        delete preparedClient[fieldName];
      }
    });
    return preparedClient;
  };

  const isUserAbleToUpdate: ComputedRef<boolean> = computed(() => {
    if (state.isNewClient && state.isFormValid) {
      return true;
    }
    if (
      !state.isNewClient &&
      state.isFormValid &&
      state.isClientFieldsChanged
    ) {
      return true;
    }
    return false;
  });

  const handleClientUpdating = async () => {
    const preparedClient = removeOptionalFalseFields();
    let isErrorHappened = false;
    if (state.isNewClient) {
      isErrorHappened = await CREATE_CLIENT(preparedClient);
    } else {
      state.isClientFieldsChanged = false;
      isErrorHappened = await UPDATE_CLIENT({
        id: route.params.id,
        client: preparedClient,
      });
    }
    if (!isErrorHappened) {
      SET_CLIENT(initialStateClient);
      router.push({ path: "/" });
    }
  };

  return {
    state,
    client,
    clientForm,
    isClientLoading,
    formatDateSimple,
    updateFieldForClient,
    updateBirthdayField,
    updateIssueDateField,
    handleClientUpdating,
    handleAutocompleteChange,
    towns,
    isTownLoading,
    citizenships,
    isCitizenshipsLoading,
    disabilities,
    isDisabilitiesLoading,
    maritalStatuses,
    isMaritalStatusesLoading,
    isFieldNotEmpty,
    isUserAbleToUpdate,
    isEmailRule,
    isAlpha,
    isPassportNumber,
    isAlphanumeric,
    isMobilePhone,
    isNumeric,
  };
};
