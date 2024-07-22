<template>
  <div v-for="field in frm.fields">
	<component :is="fieldMap[field.fieldtype]" :field="field" :frm="frm" :key="field.fieldname"></component>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import Text from './components/Text.vue'
import Select from './components/Select.vue'
import Badge from './components/Badge.vue'
import Int from './components/Int.vue'
import Autocomplete from './components/Autocomplete.vue'
import { useFormStore } from '../stores/formStore.js'



const fieldMap = ref({
  Data: Text,
  Select: Select,
  Int: Int,
  Autocomplete: Autocomplete,
  Dynamic_Link: Select,
  Heading: Badge,
  Datetime: DateTime
})
const formStore = useFormStore();
const frm = formStore.form;
</script>
