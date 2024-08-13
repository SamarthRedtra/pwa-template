<template>
  <div class="p-2">
    <TextInput
      type="text"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="isDisabled"
      v-model="value"
      @blur="formatValue"
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui'
import { defineProps, ref, watch, computed, onMounted } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const value = ref("")

const isDisabled = computed(() => {
  return field.read_only == 1 || frm.Docstatus == 1 || frm.Docstatus == 2
})

// Initialize value with three decimal places on mount
onMounted(() => {
  if (field.value !== undefined && field.value !== null) {
    const floatValue = parseFloat(field.value)
    if (!isNaN(floatValue)) {
      value.value = floatValue.toFixed(3)
    }
  }
})

// Watch for changes to the input value and update the form
watch(value, (newValue) => {
  const floatValue = parseFloat(newValue)
  if (!isNaN(floatValue)) {
    frm.setValue(field.fieldname, floatValue.toFixed(3))
  }
  if(field.value){
    if (frm.doc[field.fieldname] != field.value) {
      field.value = null
      frm.Saved = 0;
      frm.Submit = 0;
      frm.Amend = 0;
    }
  }
})

// Format value on blur
const formatValue = () => {
  if (value.value !== "") {
    const floatValue = parseFloat(value.value)
    if (!isNaN(floatValue)) {
      value.value = floatValue.toFixed(3)
    }
  }
}

// Update value from form when saved
watch(frm, (newFrm) => {
  if (field.value) {
    const floatValue = parseFloat(field.value)
    if (!isNaN(floatValue)) {
      value.value = floatValue.toFixed(3)
    }
  }
})
</script>
