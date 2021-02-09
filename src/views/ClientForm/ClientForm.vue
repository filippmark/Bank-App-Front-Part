<template>
  <VForm ref="clientForm" v-model="state.isFormValid" class="client-form ma-10">
    <VRow justify="center" align="center">
      <VCard class="client-form__card pa-6" :loading="isClientLoading">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.name"
              :rules="[isFieldNotEmpty]"
              label="Имя"
              @input="updateFieldForClient('name', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.surname"
              :rules="[isFieldNotEmpty]"
              label="Фамилия"
              @input="updateFieldForClient('surname', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.middleName"
              :rules="[isFieldNotEmpty]"
              label="Отчество"
              @input="updateFieldForClient('middleName', $event)"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VMenu
              v-model="state.isBirtdayMenuOpen"
              :close-on-content-click="false"
              :rules="[isFieldNotEmpty]"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <VTextField
                  :value="formatDateSimple(client.birthDate)"
                  :rules="[isFieldNotEmpty]"
                  label="Дата рождения"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></VTextField>
              </template>
              <VDatePicker
                :value="client.birthDate"
                :first-day-of-week="1"
                :rules="[isFieldNotEmpty]"
                locale="de-de"
                color="primary"
                no-title
                @input="updateBirthdayField($event)"
              />
            </VMenu>
          </VCol>
          <VCol cols="12" md="4">
            <VCheckbox
              :value="client.sex"
              :label="`Пол: ${client.sex ? 'мужской' : 'женский'}`"
              @change="updateFieldForClient('sex', $event)"
            ></VCheckbox>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.passportSeries"
              :rules="[isFieldNotEmpty]"
              label="Серия паспорта"
              @input="updateFieldForClient('passportSeries', $event)"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.passportNumber"
              :rules="[isFieldNotEmpty]"
              label="№ паспорта"
              @input="updateFieldForClient('passportNumber', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.issuer"
              :rules="[isFieldNotEmpty]"
              label="Кем выдан"
              @input="updateFieldForClient('issuer', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VMenu
              v-model="state.isIssueDateOpen"
              :close-on-content-click="false"
              :rules="[isFieldNotEmpty]"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <VTextField
                  :value="formatDateSimple(client.issueDate)"
                  :rules="[isFieldNotEmpty]"
                  label="Дата выдачи"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></VTextField>
              </template>
              <VDatePicker
                :value="client.issueDate"
                :first-day-of-week="1"
                locale="de-de"
                color="primary"
                no-title
                @input="updateIssueDateField($event)"
              />
            </VMenu>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.passportId"
              :rules="[isFieldNotEmpty]"
              label="Идент. номер"
              @input="updateFieldForClient('passportId', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.placeOfBirth"
              :rules="[isFieldNotEmpty]"
              label="Место рождения"
              @input="updateFieldForClient('placeOfBirth', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VAutocomplete
              :value="client.actualTownId"
              :rules="[isFieldNotEmpty]"
              :items="towns"
              :loading="isTownLoading"
              clearable
              item-text="name"
              item-value="id"
              label="Город факт. проживания"
              @change="handleAutocompleteChange('actualTownId', $event)"
            ></VAutocomplete>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.placeOfResidence"
              :rules="[isFieldNotEmpty]"
              label="Адрес факт. проживания"
              @input="updateFieldForClient('placeOfResidence', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.homePhone"
              label="Телефон дом."
              @input="updateFieldForClient('homePhone', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.mobilePhone"
              label="Телефон моб."
              @input="updateFieldForClient('mobilePhone', $event)"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.email"
              label="E-mail"
              @input="updateFieldForClient('email', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.placeOfWork"
              label="Место работы"
              @input="updateFieldForClient('placeOfWork', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.position"
              label="Должность"
              @input="updateFieldForClient('position', $event)"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VAutocomplete
              :value="client.regTownId"
              :rules="[isFieldNotEmpty]"
              :items="towns"
              :loading="isTownLoading"
              item-text="name"
              item-value="id"
              clearable
              label="Город прописки"
              @change="handleAutocompleteChange('regTownId', $event)"
            ></VAutocomplete>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.livingAddress"
              label="Адрес прописки"
              @input="updateFieldForClient('livingAddress', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VAutocomplete
              :value="client.maritalStatusId"
              :rules="[isFieldNotEmpty]"
              :items="maritalStatuses"
              :loading="isMaritalStatusesLoading"
              item-text="name"
              item-value="id"
              clearable
              label="Семейное положение"
              @change="handleAutocompleteChange('maritalStatusId', $event)"
            ></VAutocomplete>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VAutocomplete
              :value="client.citizenshipId"
              :rules="[isFieldNotEmpty]"
              :items="citizenships"
              :loading="isCitizenshipsLoading"
              item-text="name"
              item-value="id"
              clearable
              label="Гражданство"
              @change="handleAutocompleteChange('citizenshipId', $event)"
            ></VAutocomplete>
          </VCol>
          <VCol cols="12" md="4">
            <VAutocomplete
              :value="client.disabilityId"
              :items="disabilities"
              :loading="isDisabilitiesLoading"
              :rules="[isFieldNotEmpty]"
              clearable
              item-text="name"
              item-value="id"
              label="Инвалидность"
              @change="handleAutocompleteChange('disabilityId', $event)"
            ></VAutocomplete>
          </VCol>
          <VCol cols="12" md="4">
            <VCheckbox
              :value="client.isPensioner"
              label="Пенсионер"
              @change="updateFieldForClient('isPensioner', $event)"
            ></VCheckbox>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <v-currency-field
              :value="client.monthlyIncome"
              :rules="[isFieldNotEmpty]"
              label="Ежемесячный доход"
              suffix="BYN"
              @input="updateFieldForClient('monthlyIncome', $event)"
            />
          </VCol>
          <VCol cols="12" md="4">
            <VCheckbox
              :value="client.isLiableForMilitary"
              label="Военнообязанный"
              @change="updateFieldForClient('isLiableForMilitary', $event)"
            ></VCheckbox>
          </VCol>
        </VRow>
        <VCardActions>
          <VSpacer />
          <VBtn
            color="primary"
            :disabled="!state.isFormValid || !state.isClientFieldsChanged"
            :loading="isClientLoading"
            @click="handleClientUpdating"
          >
            Сохранить
          </VBtn>
        </VCardActions>
      </VCard>
    </VRow>
  </VForm>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useClientForm } from "./ClientForm";

export default defineComponent({
  setup(_, { root: { $router: router, $route: route } }) {
    const {
      state,
      clientForm,
      formatDateSimple,
      client,
      updateFieldForClient,
      updateBirthdayField,
      updateIssueDateField,
      handleClientUpdating,
      towns,
      isTownLoading,
      citizenships,
      isCitizenshipsLoading,
      disabilities,
      isDisabilitiesLoading,
      maritalStatuses,
      isMaritalStatusesLoading,
      handleAutocompleteChange,
      isFieldNotEmpty,
      isClientLoading,
    } = useClientForm(router, route);

    return {
      state,
      clientForm,
      formatDateSimple,
      client,
      updateFieldForClient,
      updateBirthdayField,
      updateIssueDateField,
      handleClientUpdating,
      towns,
      isTownLoading,
      citizenships,
      isCitizenshipsLoading,
      disabilities,
      isDisabilitiesLoading,
      maritalStatuses,
      isMaritalStatusesLoading,
      handleAutocompleteChange,
      isFieldNotEmpty,
      isClientLoading,
    };
  },
});
</script>

<style lang="scss" scoped>
.client-form {
  &__card {
    width: 60%;
  }
}

@media only screen and (max-width: 599px) {
  .client-form {
    &__card {
      width: 90%;
    }
  }
}
</style>
