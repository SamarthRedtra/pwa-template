<template>
    <div class="p-2">
        <TextInput
            v-model="field.value"
            :type="'datetime-local'"
            size="sm"
            variant="subtle"
            :label="field.label"
            :placeholder="field.label"
            :disabled="field.read_only"
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
  