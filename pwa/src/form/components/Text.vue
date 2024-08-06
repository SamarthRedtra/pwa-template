<template>
  <div class="p-2">
    <TextInput
      :type="'text'"
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

const value = ref("")

const isDisabled = computed(() => {
  return field.read_only == 1 || frm.Docstatus == 1 || frm.Docstatus == 2
})

watch(frm, (newFrm) => {
  if(field.value){
    value.value = field.value
  }
})

watch(value, (newValue) => {
  frm.setValue(field.fieldname, newValue)
})
</script>
