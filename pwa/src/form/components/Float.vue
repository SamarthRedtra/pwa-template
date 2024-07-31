<template>
  <div class="p-2">
    <TextInput
      type="number"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="field.read_only"
      v-model="value"
      @blur="formatValue"
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui';
import { defineProps, ref, watch, onMounted } from 'vue';

const { field, frm } = defineProps(['field', 'frm']);

const value = ref('');

// Initialize value with three decimal places on mount
onMounted(() => {
  if (field.value !== undefined && field.value !== null) {
    const floatValue = parseFloat(field.value);
    if (!isNaN(floatValue)) {
      value.value = floatValue.toFixed(3);
    }
  }
});

// Watch for changes to the input value and update the form
watch(value, (newValue) => {
  const floatValue = parseFloat(newValue);
  if (!isNaN(floatValue)) {
    frm.setValue(field.fieldname, floatValue.toFixed(3));
  }
});

// Function to format value on blur
const formatValue = () => {
  if (value.value !== '') {
    const floatValue = parseFloat(value.value);
    if (!isNaN(floatValue)) {
      value.value = floatValue.toFixed(3);
    }
  }
};
</script>
