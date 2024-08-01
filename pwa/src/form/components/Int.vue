<template>
  <div class="p-2">
    <TextInput
      :type="'number'"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="isDisabled"
      v-model="value"
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui'
import { defineProps, watch, ref, computed } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const value = ref('')

const isDisabled = computed(() => {
  return field.read_only == 1 || frm.Docstatus == 1
})

watch(value, (newValue) => {
  const intValue = parseInt(newValue, 10)
  frm.setValue(field.fieldname, isNaN(intValue) ? '' : intValue)
})

watch(frm, (newFrm) => {
  if (field.value) {
    value.value = field.value
  }
})
</script>
