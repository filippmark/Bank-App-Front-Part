<template>
  <VRow class="clients-list" justify="center" align="center">
    <VDataTable
      :headers="headers"
      :items="bills"
      :items-per-page="20"
      :loading="isBillsLoading"
      class="elevation-1"
    >
      <template v-slot:top>
        <VToolbar flat>
          <VToolbarTitle> Список cчетов </VToolbarTitle>
          <VDivider class="mx-4" inset vertical></VDivider>
          <VSpacer></VSpacer>
        </VToolbar>
      </template>
    </VDataTable>
  </VRow>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useBills } from "./Bills";

export default defineComponent({
  setup() {
    const { headers, bills, isBillsLoading } = useBills();

    return {
      headers,
      bills,
      isBillsLoading,
    };
  },
});
</script>

<style lang="scss">
.clients-list {
  margin-top: 100px;
  width: 100%;

  tr {
    cursor: pointer;
  }
}
</style>
