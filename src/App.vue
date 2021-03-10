<template>
  <VApp>
    <VAppBar app color="primary" dark>
      <div class="d-flex align-center"></div>

      <VSpacer></VSpacer>
      <VBtn class="mr-2" color="green" to="/"> Клиенты </VBtn>
      <VBtn class="mr-2" color="green" to="/deposits"> Депозиты </VBtn>
      <VBtn class="mr-2" color="green" to="/credits"> Кредиты </VBtn>
      <VBtn class="mr-2" color="green" to="/bills"> Счета </VBtn>
      <VBtn class="mr-2" color="green" to="/clientDeposits">
        Депозиты клиентов
      </VBtn>
    </VAppBar>

    <VMain>
      <router-view></router-view>
    </VMain>
    <VSnackbar :value="showError" color="red" multi-line vertical>
      <div v-for="message in errorMessages" :key="message" class="pb-2">
        {{ message }}
      </div>
      <template v-slot:action="{ attrs }">
        <VBtn
          color="black"
          icon
          v-bind="attrs"
          @click="UPDATE_SHOW_ERROR(false)"
        >
          <VIcon> mdi-close </VIcon>
        </VBtn>
      </template>
    </VSnackbar>
  </VApp>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { Mutations, States } from "./store/modules/error/types";
import { Modules } from "./store/types";
import { useStore } from "./uses/useStore";

export default defineComponent({
  setup() {
    const { useState, useMutations } = useStore(Modules.ERROR_SNAPBACK);

    const { errorMessages, showError } = useState([
      States.errorMessages,
      States.showError,
    ]);

    const { UPDATE_SHOW_ERROR } = useMutations([Mutations.UPDATE_SHOW_ERROR]);

    return {
      errorMessages,
      showError,
      UPDATE_SHOW_ERROR,
    };
  },
});
</script>
