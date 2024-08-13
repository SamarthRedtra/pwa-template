<template>
  <div class="p-2">
    <TextInput
      v-model="value"
      :type="'datetime-local'"
      size="sm"
      variant="subtle"
      :label="field.label"
      :placeholder="field.label"
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui'
import { defineProps, ref, computed, watch, onMounted } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const value = ref(field.value || '')

const isDisabled = computed(() => {
  return field.read_only == 1 || frm.Docstatus == 1 || frm.Docstatus == 2
})

watch(value, (newValue) => {
  frm.setValue(field.fieldname, newValue)
  if(field.value){
    if (frm.doc[field.fieldname] != field.value) {
      field.value = null;
      frm.Saved = 0;
      frm.Submit = 0;
      frm.Amend = 0;
    }
  }
})

onMounted(() => {
  if (frm.Saved == 1) {
    value.value = field.value
  }
})

watch(frm, (newFrm) => {
  if (field.value) {
    value.value = field.value
  }
})
</script>
