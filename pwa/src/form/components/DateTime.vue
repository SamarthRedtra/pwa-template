<template>
  <div class="p-2">
    <TextInput
      v-model="value"
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
import { defineProps, ref, watch, computed } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const value = ref(field.value || '')

// Watch for changes in the field value and update frm.doc accordingly
watch(value, (newValue) => {
  frm.setValue(field.fieldname, newValue)
})

// Watch for changes in the frm.doc to update the local value
watch(() => frm.doc[field.fieldname], (newValue) => {
  value.value = newValue || ''
})
</script>
