<template>
  <VRow class="clients-list" justify="center" align="center">
    <VDataTable
      :headers="headers"
      :items="deposits"
      :items-per-page="5"
      :loading="isDepositsLoading"
      class="elevation-1"
    >
      <template v-slot:top>
        <VToolbar flat>
          <VToolbarTitle> Список депозитов </VToolbarTitle>
          <VDivider class="mx-4" inset vertical></VDivider>
          <VSpacer></VSpacer>
        </VToolbar>
      </template>
      <template #item.actions="{ item }">
        <VIcon @click.stop="handleCreateClientDeposit(item)"> mdi-plus </VIcon>
      </template>
    </VDataTable>
  </VRow>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useDeposits } from "./Deposits";

export default defineComponent({
  setup(_, { root: { $router: router } }) {
    const {
      deposits,
      isDepositsLoading,
      headers,
      formatDateSimple,
      handleCreateClientDeposit,
    } = useDeposits(router);

    return {
      deposits,
      isDepositsLoading,
      headers,
      formatDateSimple,
      handleCreateClientDeposit,
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
