<template>
  <VApp>
    <VAppBar app color="primary" dark>
      <div class="d-flex align-center"></div>

      <VSpacer></VSpacer>
      <VBtn color="green" to="/"> Клиенты </VBtn>
    </VAppBar>

    <VMain>
      <router-view></router-view>
    </VMain>
    <VSnackbar v-model="showError">
      {{ errorMessage }}
      <template v-slot:action="{ attrs }">
        <VBtn
          color="pink"
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

    const { errorMessage, showError } = useState([
      States.errorMessage,
      States.showError,
    ]);

    const { UPDATE_SHOW_ERROR } = useMutations([Mutations.UPDATE_SHOW_ERROR]);

    return {
      errorMessage,
      showError,
      UPDATE_SHOW_ERROR,
    };
  },
});
</script>
