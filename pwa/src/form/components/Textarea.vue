<template>
  <div class="p-2">
    <FormControl
      type="textarea"
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
import { defineProps, watch, ref } from 'vue'

// Props to get field and form reference
const { field, frm } = defineProps(['field', 'frm'])

// Local ref for the textarea value, initialized from field.value
const value = ref(field.value || '')

// Watch for changes in the value and update the form model accordingly
watch(value, (newValue) => {
  frm.setValue(field.fieldname, newValue)
})

// Watch for changes in the field.value from the form model to keep the local value in sync
watch(() => field.value, (newValue) => {
  value.value = newValue || ''
})
</script>
