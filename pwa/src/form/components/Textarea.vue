<template>
    <div class="p-2">
      <FormControl
        :type="'textarea'"
        size="sm"
        variant="subtle"
        :placeholder="field.label"
        :disabled="field.read_only"
        v-model="value"
      />
    </div>
  </template>
  
  <script setup>
  import { FormControl } from 'frappe-ui'
  import { defineProps, watch, ref, onMounted } from 'vue'
  
  const { field, frm } = defineProps(['field', 'frm'])
  
  const value = ref("")
  
  watch(value, (newValue) => {
    frm.setValue(field.fieldname, newValue)
  })
  </script>
  