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

const value = ref(field.value)

const isDisabled = computed(() => {
  return frm.Docstatus === 1
})

watch(frm, (newFrm) => {
  if(newFrm.Docstatus == 1){
    console.log(value.value)
  }
})

watch(value, (newValue) => {
  frm.setValue(field.fieldname, newValue)
})
</script>
