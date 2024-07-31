<template>
  <div class="p-2">
    <Autocomplete
      :options="field.options"
      v-model="value"
      size="sm"
      variant="subtle"
      :label="field.label"
      :placeholder="field.label"
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup>
import { Autocomplete } from 'frappe-ui'
import { defineProps, ref, computed, watch, onMounted } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const value = ref(field.value || '')

const isDisabled = computed(() => {
  return field.read_only || frm.Docstatus === 1
})

watch(() => frm.doc[field.fieldname], (newVal) => {
  value.value = newVal
})

watch(value, (newValue) => {
  frm.setValue(field.fieldname, newValue)
})
</script>
