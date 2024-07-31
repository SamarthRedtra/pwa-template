<template>
  <div class="p-2">
    <TextInput
      :type="'number'"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="field.read_only"
      v-model="value"
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui';
import { defineProps, watch, ref } from 'vue';

const { field, frm } = defineProps(['field', 'frm']);

const value = ref('');

// Watch for changes to the input value and update the form
watch(value, (newValue) => {
  const intValue = parseInt(newValue, 10);
  if (!isNaN(intValue)) {
    frm.setValue(field.fieldname, intValue);
  } else {
    // Handle invalid input, setting the form field to an empty string
    frm.setValue(field.fieldname, '');
  }
});
</script>
