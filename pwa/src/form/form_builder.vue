<template>
  <div v-for="field in frm.fields">
	<component :is="fieldMap[field.fieldtype]" :field="field" :key="field.fieldname"></component>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import Text from './components/Text.vue'
import Select from './components/Select.vue'



const fieldMap = ref({
  Data: Text,
  Select: Select,
})

const { frm } = defineProps(['frm'])
</script>
