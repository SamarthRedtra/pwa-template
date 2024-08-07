<template>
  <div class="p-2">
    <Autocomplete
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
  frm.setValue(field.fieldname, newValue.value);
});
</script>
