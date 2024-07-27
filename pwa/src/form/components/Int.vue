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
import { TextInput } from 'frappe-ui'
import { defineProps, watch, ref } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const value = ref('')

watch(value, (newValue) => {
  const intValue = parseInt(newValue, 10);
  frm.setValue(field.fieldname, isNaN(intValue) ? '' : intValue);
})
</script>
