<template>
  <div class="p-2">
    <TextInput
      type="text"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="field.read_only"
      v-model="displayValue"
      @input="validateInput"
    />
  </div>
</template>

<script setup>
import { TextInput, createListResource } from 'frappe-ui';
import { defineProps, ref, watch, onMounted } from 'vue';

const { field, frm } = defineProps(['field', 'frm']);

const value = ref('');
const displayValue = ref('');
const currencySymbol = ref('');

// Fetch options and update the currency symbol
const fetchOptions = async () => {
  const currencyResource = createListResource({
    doctype: 'Company',
    fields: ['default_currency'],
    orderBy: 'creation desc',
  });

  await currencyResource.reload();
  const companies = currencyResource.data;
  
  if (companies.length > 0) {
    const defaultCurrency = companies[0].default_currency;

    const symbolResource = createListResource({
      doctype: 'Currency',
      fields: ['symbol'],
      filters: { name: defaultCurrency },
      orderBy: 'creation desc',
    });

    await symbolResource.reload();
    const symbols = symbolResource.data;

    if (symbols.length > 0) {
      currencySymbol.value = symbols[0].symbol;
    }
  }
};

// Initialize the value and displayValue
onMounted(() => {
  fetchOptions().then(() => {
    value.value = frm.doc[field.fieldname]?.replace(/[^0-9]/g, '') || '';
    displayValue.value = `${currencySymbol.value}${value.value}`;
  });
});

// Watch for changes in displayValue and update the underlying value
watch(displayValue, (newValue) => {
  const numericValue = newValue.replace(/[^0-9]/g, '');
  value.value = numericValue;
  frm.setValue(field.fieldname, `${currencySymbol.value}${numericValue}`);
});

// Validate input to ensure only numeric values and prepend currency symbol
const validateInput = (event) => {
  const input = event.target.value;
  const numericValue = input.replace(/[^0-9]/g, '');
  value.value = numericValue;
  displayValue.value = `${currencySymbol.value}${numericValue}`;
};
</script>
