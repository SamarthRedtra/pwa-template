<template>
  <div class="p-2">
    <p class=" text-[12px] text-gray-600">{{field.label}}</p>
    <TextInput
      :type="'number'"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="isDisabled"
      v-model="value"
      class=" mt-1"
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui'
import { defineProps, watch, ref, computed } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const value = ref('')

const isDisabled = computed(() => {
  return field.read_only == 1 || frm.Docstatus == 1 || frm.Docstatus == 2
})

watch(value, (newValue) => {
  const intValue = parseInt(newValue, 10)
  frm.setValue(field.fieldname, isNaN(intValue) ? '' : intValue)
  if(field.value){
    if (frm.doc[field.fieldname] != field.value) {
      field.value = null
      frm.Saved = 0;
      frm.Submit = 0;
      frm.Amend = 0;
    }
  }
})

watch(frm, (newFrm) => {
  if (field.value) {
    value.value = field.value
  }
  
})
</script>
