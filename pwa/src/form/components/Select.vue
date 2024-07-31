<template>
  <div class="p-2">
    <Autocomplete
      :options="field.options"
      v-model="autocompleteValue"
      size="sm"
      variant="subtle"
      :label="field.label"
      :placeholder="field.label"
      :disabled="field.read_only"
      hide-search="true"
    />
  </div>
</template>

<script setup>
import { Autocomplete } from 'frappe-ui'
import { defineProps, ref, watch } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

// Local ref for the autocomplete value
const autocompleteValue = ref(field.value || '')

// Watch for changes in autocompleteValue and update frm accordingly
watch(autocompleteValue, (newValue) => {
  frm.setValue(field.fieldname, newValue);
});

watch(() => field.value, (newValue) => {
  autocompleteValue.value = newValue;
});
</script>
