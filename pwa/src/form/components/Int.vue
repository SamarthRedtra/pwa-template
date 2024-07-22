<template>
    <div class="p-2">
      <TextInput
        :type="'number'"
        size="sm"
        variant="subtle"
        :placeholder="field.label"
        :disabled="field.read_only"
        v-model="value"
      />
    </div>
  </template>
  
  <script setup>
  import { TextInput } from 'frappe-ui'
  import { defineProps, watch, ref, onMounted } from 'vue'
  
  const { field, frm } = defineProps(['field', 'frm'])
  
  const value = ref("")
  
  watch(value, (newValue) => {
    frm.setValue(field.fieldname, newValue)
  })
  </script>
  