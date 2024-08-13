<template>
  <div class="p-2">
    <TextInput
      :type="'text'"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="isDisabled"
      v-model="displayValue"
      @input="validateInput"
    />
  </div>
</template>

<script setup>
import { TextInput, createListResource } from 'frappe-ui';
import { defineProps, watch, ref, computed, onMounted } from 'vue';

const { field, frm } = defineProps(['field', 'frm']);

const value = ref("");  
const displayValue = ref("");  
const fetchedOptions = ref([]); 

const isDisabled = computed(() => {
  return field.read_only == 1 || frm.Docstatus == 1 || frm.Docstatus == 2;
});

const fetchOptions = async () => {
  const currency = createListResource({
    doctype: 'Company',
    fields: ['default_currency'],
    orderBy: 'creation desc',
  });

  await currency.reload();
  const dataArray = currency.data;
  if (dataArray.length > 0) {
    for (const data of dataArray) {
      const symbol = createListResource({
        doctype: 'Currency',
        fields: ['symbol'],
        filters: {
          name: data.default_currency,
        },
        orderBy: 'creation desc',
      });
      await symbol.reload();
      const symbolValue = symbol.data;
      if (symbolValue.length > 0) {
        fetchedOptions.value.push(symbolValue[0].symbol);
      }
    }
  }
};

watch(frm, (newFrm) => {
  if (field.value) {
    if(field.value == null){
      value.value = 0
    }
    else{
      value.value = field.value;
    }
    // Update displayValue to include the symbol
    const symbol = fetchedOptions.value.length > 0 ? fetchedOptions.value[0] : '';
    displayValue.value = `${symbol}${value.value}`;
  }
});

watch(displayValue, (newValue) => {
  const numericValue = newValue.replace(/[^0-9]/g, ''); 
  value.value = numericValue;
  const symbol = fetchedOptions.value.length > 0 ? fetchedOptions.value[0] : '';
  const valueWithSymbol = symbol + numericValue;
  frm.setValue(field.fieldname, valueWithSymbol);
  if(field.value){
    if (frm.doc[field.fieldname] != field.value) {
      field.value = null;
      frm.Saved = 0;
      frm.Submit = 0;
      frm.Amend = 0;
    }
  }
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
