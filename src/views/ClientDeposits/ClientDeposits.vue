<template>
  <VRow class="clients-list" justify="center" align="center">
    <VDataTable
      :headers="headers"
      :items="clientDeposits"
      :items-per-page="5"
      :loading="isClientDepositsLoading"
      class="elevation-1"
      @click:row="handleRowClick"
    >
      <template v-slot:top>
        <VToolbar flat>
          <VToolbarTitle> Список депозитов клиентов </VToolbarTitle>
          <VDivider class="mx-4" inset vertical></VDivider>
          <VSpacer></VSpacer>
        </VToolbar>
      </template>
      <template #item.actions="{ item }">
        <VIcon @click.stop="handleDeleteClient(item)"> mdi-delete </VIcon>
      </template>
    </VDataTable>
  </VRow>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useClientDeposits } from "./ClientDeposits";

export default defineComponent({
  setup(_, { root: { $router: router } }) {
    const {
      clientDeposits,
      isClientDepositsLoading,
      headers,
      formatDateSimple,
      handleRowClick,
      handleDeleteClient,
    } = useClientDeposits(router);

    return {
      clientDeposits,
      isClientDepositsLoading,
      headers,
      formatDateSimple,
      handleRowClick,
      handleDeleteClient,
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
