<template>
  <VRow class="clients-list" justify="center" align="center">
    <v-data-table
      :headers="headers"
      :items="clients"
      :items-per-page="5"
      class="elevation-1"
      @click:row="handleRowClick"
    >
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
    </v-data-table>
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
    } = useClients(router);

    return {
      clients,
      isClientLoading,
      headers,
      formatDateSimple,
      handleRowClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.clients-list {
  margin-top: 100px;
  width: 100%;
}
</style>
