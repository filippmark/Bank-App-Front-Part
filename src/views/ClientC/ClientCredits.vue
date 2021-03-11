<template>
  <VRow class="clients-list" justify="center" align="center">
    <VDataTable
      :headers="headers"
      :items="clientCredits"
      :items-per-page="5"
      :loading="isClientCreditsLoading"
      class="elevation-1"
      @click:row="handleRowClick"
    >
      <template v-slot:top>
        <VToolbar flat>
          <VToolbarTitle> Список кредитов клиентов </VToolbarTitle>
          <VDivider class="mx-4" inset vertical></VDivider>
          <VSpacer></VSpacer>
          <VBtn
            class="mr-2"
            color="primary"
            :loading="closingBankDay"
            @click="handleCloseBankDay"
          >
            Закрыть банковский день
          </VBtn>
        </VToolbar>
      </template>
    </VDataTable>
  </VRow>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useClientCredits } from "./ClientCredits";

export default defineComponent({
  setup(_, { root: { $router: router } }) {
    const {
      clientCredits,
      isClientCreditsLoading,
      headers,
      formatDateSimple,
      handleRowClick,
      handleCloseBankDay,
      closingBankDay,
    } = useClientCredits(router);

    return {
      clientCredits,
      isClientCreditsLoading,
      headers,
      formatDateSimple,
      handleRowClick,
      handleCloseBankDay,
      closingBankDay,
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
