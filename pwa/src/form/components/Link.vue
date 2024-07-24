<template>
    <div class="p-2">
      <Autocomplete
        :options="fetchedOptions"
        v-model="field.value"
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
  import { Autocomplete, createListResource } from 'frappe-ui'
  import { defineProps, ref, watch, onMounted } from 'vue'
  
  const { field, frm } = defineProps(['field', 'frm'])
  
  const fetchedOptions = ref([])
  
  const fetchOptions = async () => {
    const resource = createListResource({
      doctype: field.options,
      fields: ['name'],
      orderBy: 'creation desc',
    })
  
    resource.reload().then(() => {
    let dataArray = resource.data;
    if (dataArray.length > 0) {
      fetchedOptions.value = dataArray.map(option => option.name)
      console.log(fetchedOptions.value);
    }
  });
  }
  
  onMounted(() => {
    fetchOptions()
  })
  
  watch(() => field.value, (newValue) => {
    frm.setValue(field.fieldname, newValue.value)
  })
  </script>
  