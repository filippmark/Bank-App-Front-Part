<template>
  <VForm ref="clientForm" class="client-form ma-10">
    <VRow justify="center" align="center">
      <VCard class="client-form__card pa-6" :loading="state.loading">
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.name"
              label="Имя"
              @input="updateFieldForClient('name', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.surname"
              label="Фамилия"
              @input="updateFieldForClient('surname', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.middleName"
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
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <VTextField
                  :value="formatDateSimple(client.birthDate)"
                  label="Дата рождения"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></VTextField>
              </template>
              <VDatePicker
                :value="client.birthDate"
                :first-day-of-week="1"
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
              label="Серия паспорта"
              @input="updateFieldForClient('passportSeries', $event)"
            ></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.passportId"
              label="№ паспорта"
              @input="updateFieldForClient('passportId', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.issuer"
              label="Кем выдан"
              @input="updateFieldForClient('issuer', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VMenu
              v-model="state.isIssueDateOpen"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
            >
              <template v-slot:activator="{ on }">
                <VTextField
                  :value="formatDateSimple(client.issueDate)"
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
              label="Идент. номер"
              @input="updateFieldForClient('passportId', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.placeOfBirth"
              label="Место рождения"
              @input="updateFieldForClient('placeOfBirth', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VAutocomplete label="Город факт. проживания"></VAutocomplete>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.placeOfResidence"
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
            <VAutocomplete label="Город прописки"></VAutocomplete>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField
              :value="client.livingAddress"
              label="Адрес прописки"
              @input="updateFieldForClient('livingAddress', $event)"
            ></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VAutocomplete label="Семейное положение"></VAutocomplete>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VAutocomplete label="Гражданство"></VAutocomplete>
          </VCol>
          <VCol cols="12" md="4">
            <VAutocomplete label="Инвалидность"></VAutocomplete>
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
          <VBtn color="primary"> Сохранить </VBtn>
        </VCardActions>
      </VCard>
    </VRow>
  </VForm>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useClientForm } from "./ClientForm";

export default defineComponent({
  setup() {
    const {
      state,
      clientForm,
      formatDateSimple,
      client,
      updateFieldForClient,
      updateBirthdayField,
      updateIssueDateField,
    } = useClientForm();

    return {
      state,
      clientForm,
      formatDateSimple,
      client,
      updateFieldForClient,
      updateBirthdayField,
      updateIssueDateField,
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
