<template>
  <div class="p-2">
    <TextInput
      :type="'text'"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="field.read_only"
      modelValue=""
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui'
import { defineProps } from 'vue'

const { field } = defineProps(['field'])
</script>
