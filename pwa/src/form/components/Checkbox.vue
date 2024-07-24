<template>
    <div class="p-3">
      <Checkbox
        v-model="fieldValue"
        size="sm"
        :label="field.label"
        :disabled="field.read_only"
      />
    </div>
  </template>
  
  <script setup>
  import { Checkbox } from 'frappe-ui'
  import { defineProps, ref, watch } from 'vue'
  
  const props = defineProps({
    field: Object,
    frm: Object
  })
  
  const fieldValue = ref(props.field.value)
  
  watch(fieldValue, (newValue) => {
    props.frm.setValue(props.field.fieldname, newValue)
  })
  
  watch(() => props.field.value, (newValue) => {
    if (newValue === 0) {
      fieldValue.value = 1
    } else {
      fieldValue.value = newValue
    }
  }, { immediate: true }) 
  </script>
  