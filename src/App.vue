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
  </VApp>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({});
</script>
