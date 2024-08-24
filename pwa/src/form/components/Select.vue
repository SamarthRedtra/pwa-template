<template>
  <div class="p-2">
    <p class=" text-[12px] text-gray-600">{{field.label}}</p>
    <Autocomplete
      class=" mt-1"
      :options="field.options"
      v-model="field.value"
      size="sm"
      variant="subtle"
      :label="field.label"
      :placeholder="field.label"
      :disabled="isDisabled"
      hide-search="true"
    />
  </div>
</template>

<script setup>
import { Autocomplete } from 'frappe-ui'
import { defineProps, computed, watch } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const isDisabled = computed(() => {
  return field.read_only == 1 || frm.Docstatus == 1 || frm.Docstatus == 2
})

watch(() => field.value, (newValue) => {
  const finalValue = newValue?.value ?? newValue;
  field.value = finalValue
  frm.setValue(field.fieldname, finalValue);
  if(field.value){
    if (frm.doc[field.fieldname] != field.value) {
      field.value = null
      frm.Saved = 0;
      frm.Submit = 0;
      frm.Amend = 0;
    }
  }
});
</script>
