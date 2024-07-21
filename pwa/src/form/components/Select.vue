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
      hide-search="true"
    />
  </div>
</template>

<script setup>
import { Autocomplete } from 'frappe-ui'
import { defineProps } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])
</script>
