<template>
    <div class="p-2">
        <Autocomplete
        :options="field.options"
        v-model="field.value"
        size="sm"
        variant="subtle"
        :label="field.label"
        :placeholder="field.label"
        :disabled="field.read_only"
        />
    </div>
  </template>
  
  <script setup>
    import { Autocomplete } from 'frappe-ui'
    import { defineProps, watch, ref, onMounted } from 'vue'
    
    const { field, frm } = defineProps(['field', 'frm'])
    
    watch(() => field.value, (newValue) => {
        frm.setValue(field.fieldname, newValue.value);
    });
  </script>
  