<template>
  <VForm
    ref="clientDepositForm"
    v-model="isFormValid"
    class="create-client-deposit ma-10"
  >
    <VRow justify="center" align="center">
      <VCard v-if="!!credit" class="create-client-deposit__card pa-6">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="credit.percent"
              label="годовой процент"
              readonly
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="credit.termInMs"
              label="Длительность в месяцах"
              readonly
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="credit.isAnnuity ? 'Аннуитетный' : 'Дифференцированный'"
              label="тип кредита"
              readonly
            >
            </VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <v-currency-field
              :value="credit.maxSum"
              :suffix="credit.currency.name"
              label="Максимальная сумма кредитования"
              readonly
            ></v-currency-field>
          </VCol>
          <VCol cols="12" md="4">
            <v-currency-field
              v-model.number="creditSum"
              :suffix="credit.currency.name"
              :rules="[isCreditSumLowerThanMaxSum]"
              label="Сумма кредита"
              :disabled="isInCreatedCredit"
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
              :disabled="isInCreatedCredit"
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
        <template v-if="isInCreatedCredit">
          <VRow>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="mainBill.debit"
                :suffix="credit.currency.name"
                label="Дебит основного счета"
              />
            </VCol>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="mainBill.credit"
                :suffix="credit.currency.name"
                label="Кредит основного счета"
              />
            </VCol>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="mainBill.balance"
                :suffix="credit.currency.name"
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
                :suffix="credit.currency.name"
                label="Дебит процентного счета"
              />
            </VCol>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="percentBill.credit"
                :suffix="credit.currency.name"
                label="Кредит процентного счета"
              />
            </VCol>
            <VCol cols="12" md="4">
              <v-currency-field
                :value="percentBill.balance"
                :suffix="credit.currency.name"
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
          <template v-if="isInCreatedCredit">
            <VBtn
              :disabled="clientCredit.isClosed"
              :loading="depositClosing"
              color="primary"
              @click="handleCloseCredit"
            >
              {{ !clientCredit.isClosed ? "Закрыть кредит" : "Кредит закрыт" }}
            </VBtn>
            <VBtn
              :disabled="clientCredit.isClosed"
              color="primary"
              :loading="percentReceiveing"
              @click="handlePayEarnedPercents"
            >
              Заплатить проценты по счету
            </VBtn>
          </template>
          <template v-else>
            <VBtn
              color="primary"
              :loading="clientDepositCreating"
              :disabled="!isFormValid || isInCreatedCredit"
              @click="hanleCreateClientCredit"
            >
              Создать
            </VBtn>
          </template>
        </VCardActions>
        <VRow v-if="plan.length">
          <VSimpleTable>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Date</th>
                  <th class="text-left">Payment</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in plan" :key="item.paymentDate">
                  <td>{{ item.paymentDate }}</td>
                  <td>{{ item.paymentPerMonth }}</td>
                </tr>
              </tbody>
            </template>
          </VSimpleTable>
        </VRow>
      </VCard>
    </VRow>
  </VForm>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { useClientDepositForm } from "./CreateClientCredit";

export default defineComponent({
  setup(_, { root: { $router: router, $route: route } }) {
    const {
      clients,
      clientDepositForm,
      isClientLoading,
      formatDateSimple,
      hanleCreateClientCredit,
      isFieldNotEmpty,
      isFormValid,
      creditSum,
      clientDepositCreating,
      isCreditSumLowerThanMaxSum,
      credit,
      selectedClient,
      isInCreatedCredit,
      mainBill,
      percentBill,
      handlePayEarnedPercents,
      percentReceiveing,
      creditClosing,
      handleCloseCredit,
      clientCredit,
      UPDATE_ERROR_MESSAGE,
      plan,
    } = useClientDepositForm(router, route);

    return {
      clients,
      clientDepositForm,
      isClientLoading,
      formatDateSimple,
      hanleCreateClientCredit,
      isFieldNotEmpty,
      isFormValid,
      creditSum,
      clientDepositCreating,
      isCreditSumLowerThanMaxSum,
      credit,
      selectedClient,
      isInCreatedCredit,
      mainBill,
      percentBill,
      handlePayEarnedPercents,
      percentReceiveing,
      creditClosing,
      handleCloseCredit,
      clientCredit,
      UPDATE_ERROR_MESSAGE,
      plan,
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
