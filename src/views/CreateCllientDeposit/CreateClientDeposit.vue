<template>
  <VForm
    ref="clientDepositForm"
    v-model="isFormValid"
    class="create-client-deposit ma-10"
  >
    <VRow justify="center" align="center">
      <VCard v-if="!!deposit" class="create-client-deposit__card pa-6">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="deposit.percent"
              label="годовой процент"
              readonly
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="deposit.termInMs"
              label="Длительность в месяцах"
              readonly
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="deposit.isRevocable ? 'Отзывной' : 'Срочный'"
              label="тип депозита"
              readonly
            >
            </VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <v-currency-field
              :value="deposit.minSum"
              :suffix="deposit.currency.name"
              label="Минимальная сумма депозита"
              readonly
            ></v-currency-field>
          </VCol>
          <VCol cols="12" md="4">
            <v-currency-field
              v-model.number="startSum"
              :suffix="deposit.currency.name"
              :rules="[isStartSumBiggerThanMinSum]"
              label="Сумма депозита"
              :disabled="isInCreatedDeposit"
            ></v-currency-field>
          </VCol>
          <VCol cols="12" md="4">
            <VAutocomplete
              v-model="selectedClient"
              :items="clients"
              :rules="[isFieldNotEmpty]"
              clearable
              item-text="id"
              item-value="id"
              label="клиент"
              :disabled="isInCreatedDeposit"
            >
              <template #item="{ item }">
                <VListItemContent>
                  <VListItemTitle>
                    {{ `${item.name} ${item.middleName}` }}
                  </VListItemTitle>
                  <VListItemSubtitle>
                    {{ item.id }}
                  </VListItemSubtitle>
                </VListItemContent>
              </template>
            </VAutocomplete>
          </VCol>
        </VRow>
        <template v-if="isInCreatedDeposit">
          <VRow>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="mainBill.debit"
                :suffix="deposit.currency.name"
                label="Дебит основного счета"
              />
            </VCol>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="mainBill.credit"
                :suffix="deposit.currency.name"
                label="Кредит основного счета"
              />
            </VCol>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="mainBill.balance"
                :suffix="deposit.currency.name"
                label="Сальдо основного счета"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <VTextField
                :value="mainBill.account"
                readonly
                label="номер основного счета"
              ></VTextField>
            </VCol>
            <VCol cols="6">
              <VTextField
                :value="mainBill.id"
                readonly
                label="id основного счета"
              ></VTextField>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="percentBill.debit"
                :suffix="deposit.currency.name"
                label="Дебит процентного счета"
              />
            </VCol>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="percentBill.credit"
                :suffix="deposit.currency.name"
                label="Кредит процентного счета"
              />
            </VCol>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="percentBill.balance"
                :suffix="deposit.currency.name"
                label="Сальдо процентного счета"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <VTextField
                :value="percentBill.account"
                readonly
                label="номер процентного счета"
              ></VTextField>
            </VCol>
            <VCol cols="6">
              <VTextField
                :value="percentBill.id"
                readonly
                label="id процентного счета"
              ></VTextField>
            </VCol>
          </VRow>
        </template>
        <VCardActions>
          <VSpacer />
          <template v-if="isInCreatedDeposit">
            <VBtn
              :disabled="clientDeposit.isClosed"
              :loading="depositClosing"
              color="primary"
              @click="handleCloseDeposit"
            >
              {{
                !clientDeposit.isClosed ? "Закрыть депозит" : "Депозит закрыт"
              }}
            </VBtn>
            <VBtn
              v-if="deposit.isRevocable"
              :disabled="clientDeposit.isClosed"
              color="primary"
              :loading="percentReceiveing"
              @click="handleGetEarnedPercents"
            >
              Получить проценты по счету
            </VBtn>
          </template>
          <template v-else>
            <VBtn
              color="primary"
              :loading="clientDepositCreating"
              :disabled="!isFormValid || isInCreatedDeposit"
              @click="hanleCreateClientDeposit"
            >
              Создать
            </VBtn>
          </template>
        </VCardActions>
      </VCard>
    </VRow>
  </VForm>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { useClientDepositForm } from "./CreateClientDeposit";

export default defineComponent({
  setup(_, { root: { $router: router, $route: route } }) {
    const {
      state,
      clients,
      clientDepositForm,
      isClientLoading,
      formatDateSimple,
      hanleCreateClientDeposit,
      isFieldNotEmpty,
      isAbleToCreateClientDeposit,
      isFormValid,
      startSum,
      clientDepositCreating,
      isStartSumBiggerThanMinSum,
      deposit,
      selectedClient,
      isInCreatedDeposit,
      mainBill,
      percentBill,
      percentReceiveing,
      handleGetEarnedPercents,
      depositClosing,
      handleCloseDeposit,
      clientDeposit,
    } = useClientDepositForm(router, route);

    return {
      state,
      clients,
      clientDepositForm,
      isClientLoading,
      formatDateSimple,
      hanleCreateClientDeposit,
      isFieldNotEmpty,
      isAbleToCreateClientDeposit,
      isFormValid,
      startSum,
      clientDepositCreating,
      isStartSumBiggerThanMinSum,
      deposit,
      selectedClient,
      isInCreatedDeposit,
      mainBill,
      percentBill,
      handleGetEarnedPercents,
      percentReceiveing,
      depositClosing,
      handleCloseDeposit,
      clientDeposit,
    };
  },
});
</script>
<style lang="scss" scoped>
.create-client-deposit {
  &__card {
    width: 60%;
  }
}

@media only screen and (max-width: 599px) {
  .create-client-deposit {
    &__card {
      width: 90%;
    }
  }
}
</style>
