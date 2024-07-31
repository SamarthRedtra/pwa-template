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

// Watch for changes in fieldValue to update frm.doc
watch(fieldValue, (newValue) => {
  props.frm.setValue(props.field.fieldname, newValue)
})

// Watch for changes in props.field.value to keep fieldValue in sync
watch(() => props.field.value, (newValue) => {
  fieldValue.value = newValue
}, { immediate: true })
</script>
