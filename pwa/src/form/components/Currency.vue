<template>
<div class="p-2">
    <TextInput
        :type="'text'"
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
import { defineProps, watch, ref, onMounted } from 'vue';

const { field, frm } = defineProps(['field', 'frm']);

const value = ref("");  
const displayValue = ref("");  
const fetchedOptions = ref([]); 

const fetchOptions = async () => {
  const currency = createListResource({
    doctype: 'Company',
    fields: ['default_currency'],
    orderBy: 'creation desc',
  });

  await currency.reload();
  let dataArray = currency.data;
  if (dataArray.length > 0) {
    for (let i in dataArray) {
      const symbol = createListResource({
        doctype: 'Currency',
        fields: ['symbol'],
        filters: {
          name: dataArray[i].default_currency
        },
        orderBy: 'creation desc',
      });
      await symbol.reload();
      let symbolValue = symbol.data;
      if (symbolValue.length > 0) {
        fetchedOptions.value.push(symbolValue[0].symbol);
      }
    }
  }
};

watch(displayValue, (newValue) => {
  const numericValue = newValue.replace(/[^0-9]/g, ''); 
  value.value = numericValue;
  const symbol = fetchedOptions.value.length > 0 ? fetchedOptions.value[0] : '';
  const valueWithSymbol = symbol + numericValue;
  frm.setValue(field.fieldname, valueWithSymbol);
});

const validateInput = (event) => {
  const input = event.target.value;
  const numericValue = input.replace(/[^0-9]/g, '');
  value.value = numericValue;
  const symbol = fetchedOptions.value.length > 0 ? fetchedOptions.value[0] : '';
  displayValue.value = `${symbol}${numericValue}`;
};

onMounted(() => {
  fetchOptions();
});
</script>

