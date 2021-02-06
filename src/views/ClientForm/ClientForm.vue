<template>
  <VForm class="client-form ma-10">
    <VRow justify="center" align="center">
      <VCard class="client-form__card pa-6" :loading='state.loading'>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.name" label="Имя"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.surname" label="Фамилия"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.middleName" label="Отчество"></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VMenu
              v-model="state.isBirtdayMenuOpen"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <VTextField
                  label="Дата рождения"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></VTextField>
              </template>
              <VDatePicker
                v-model="state.client.birthDate"
                :first-day-of-week="1"
                locale="de-de"
                color="primary"
                no-title
                @input="state.client.isBirtdayMenuOpen = false"
              />
            </VMenu>
          </VCol>
          <VCol cols="12" md="4">
            <VCheckbox v-model="state.client.sex" :label="`Пол: ${state.client.sex ? 'мужской': 'женский'}`"></VCheckbox>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.passportSeries" label="Серия паспорта"></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.passportId" label="№ паспорта"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.issuer" label="Кем выдан"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VMenu
              v-model="state.isIssueDateOpen"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <VTextField
                  label="Дата выдачи"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></VTextField>
              </template>
              <VDatePicker
                v-model="state.client.issueDate"
                :first-day-of-week="1"
                locale="de-de"
                color="primary"
                no-title
                @input="state.client.isIssueDateOpen = false"
              />
            </VMenu>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.passportId" label="Идент. номер"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.placeOfBirth" label="Место рождения"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VAutocomplete label="Город факт. проживания"></VAutocomplete>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.placeOfResidence" label="Адрес факт. проживания"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.homePhone" label="Телефон дом."></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.mobilePhone" label="Телефон моб."></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.email" label="E-mail"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.placeOfWork" label="Место работы"></VTextField>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.position" label="Должность"></VTextField>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
            <VAutocomplete label="Город прописки"></VAutocomplete>
          </VCol>
          <VCol cols="12" md="4">
            <VTextField v-model="state.client.livingAddress" label="Адрес прописки"></VTextField>
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
            <VCheckbox label="Пенсионер"></VCheckbox>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12" md="4">
              <v-currency-field label="Ежемесячный доход" suffix="BYN"/>
          </VCol>
          <VCol cols="12" md="4">
            <VCheckbox label="Военнообязанный"></VCheckbox>
          </VCol>
        </VRow>
        <VCardActions>
          <VSpacer/>
          <VBtn color="primary">
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
  setup() {
    const { state } = useClientForm();
    
    return {
      state,
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
</style>
