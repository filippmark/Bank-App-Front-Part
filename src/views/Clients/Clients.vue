<template>
  <VRow class="clients-list" justify="center" align="center">
    <VDataTable
      :headers="headers"
      :items="clients"
      :items-per-page="5"
      :loading="isClientLoading"
      class="elevation-1"
      @click:row="handleRowClick"
    >
      <template v-slot:top>
        <VToolbar flat>
          <VToolbarTitle> Список клиентов </VToolbarTitle>
          <VDivider class="mx-4" inset vertical></VDivider>
          <VSpacer></VSpacer>
          <VBtn dark color="green" to="/client"> новый клиент </VBtn>
        </VToolbar>
      </template>
      <template #item.name="{ item }">
        <span>
          {{ `${item.name} ${item.surname} ${item.middleName}` }}
        </span>
      </template>
      <template #item.birthDate="{ item }">
        <span>
          {{ formatDateSimple(item.birthDate) }}
        </span>
      </template>
      <template #item.placeOfWork="{ item }">
        <span>
          {{ item.placeOfWork ? item.placeOfWork : "-" }}
        </span>
      </template>
      <template #item.position="{ item }">
        <span>
          {{ item.position ? item.position : "-" }}
        </span>
      </template>
      <template #item.actions="{ item }">
        <VIcon @click.stop="handleDeleteClient(item)"> mdi-delete </VIcon>
      </template>
    </VDataTable>
  </VRow>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useClients } from "./Clients";

export default defineComponent({
  setup(_, { root: { $router: router } }) {
    const {
      clients,
      isClientLoading,
      headers,
      formatDateSimple,
      handleRowClick,
      handleDeleteClient,
    } = useClients(router);

    return {
      clients,
      isClientLoading,
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
