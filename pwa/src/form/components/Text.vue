<template>
  <div class="p-2">
    <FormControl
      :type="'text'"
      size="sm"
      variant="subtle"
      :label="field.label"
      :placeholder="field.label"
      :disabled="isDisabled"
      v-model="value"
    />
  </div>
</template>

<script setup>
import { FormControl } from 'frappe-ui'
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

  if(field.value){
    if (frm.doc[field.fieldname] != field.value) {
      field.value = null;
      frm.Saved = 0;
      frm.Submit = 0;
      frm.Amend = 0;
    }
  }

})
</script>

<style scoped>

</style>
