<template>
    <div class="p-2">
      <Badge
        :type="'text'"
        size="lg"
        theme="gray"
        :variant="'ghost'"
        :label="value"
      >{{value}}</Badge>
    </div>
  </template>
  
  <script setup>
  import { Badge } from 'frappe-ui'
  import { defineProps, watch, ref, onMounted } from 'vue'
  
  const { field, frm } = defineProps(['field', 'frm'])
  
  const value = ref(field.label)
  console.log(value.value)
  watch(value, (newValue) => {
    frm.setValue(field.val, newValue)
  })
  </script>
  