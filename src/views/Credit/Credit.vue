<template>
  <VRow class="clients-list" justify="center" align="center">
    <VDataTable
      :headers="headers"
      :items="credits"
      :items-per-page="5"
      :loading="isCreditsLoading"
      class="elevation-1"
    >
      <template v-slot:top>
        <VToolbar flat>
          <VToolbarTitle> Список кредитов </VToolbarTitle>
          <VDivider class="mx-4" inset vertical></VDivider>
          <VSpacer></VSpacer>
        </VToolbar>
      </template>
      <template #item.actions="{ item }">
        <VIcon @click.stop="handleCreateClientCredit(item)"> mdi-plus </VIcon>
      </template>
    </VDataTable>
  </VRow>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useDeposits } from "./Credit";

export default defineComponent({
  setup(_, { root: { $router: router } }) {
    const {
      credits,
      isCreditsLoading,
      headers,
      formatDateSimple,
      handleCreateClientCredit,
    } = useDeposits(router);

    return {
      credits,
      isCreditsLoading,
      headers,
      formatDateSimple,
      handleCreateClientCredit,
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
