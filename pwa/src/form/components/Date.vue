<template>
  <div class="p-2">
    <TextInput
      v-model="value"
      type="date"
      size="sm"
      variant="subtle"
      :label="field.label"
      :placeholder="field.label"
      :disabled="field.read_only"
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui';
import { defineProps, ref, watch, onMounted } from 'vue';

const { field, frm } = defineProps(['field', 'frm']);
const value = ref('');

// Initialize the value from frm.doc when component is mounted
onMounted(() => {
  value.value = frm.doc[field.fieldname] || '';
});

// Watch for changes in the input value and update frm.doc
watch(value, (newValue) => {
  frm.setValue(field.fieldname, newValue);
});
</script>
