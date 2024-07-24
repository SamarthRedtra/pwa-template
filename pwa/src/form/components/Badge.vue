<template>
    <div class="p-2">
      <Badge
        :type="'text'"
        size="lg"
        theme="gray"
        :variant="'ghost'"
        :label="value"
      >{{field.label}}</Badge>
    </div>
  </template>
  
  <script setup>
  import { Badge } from 'frappe-ui'
  import { defineProps, watch, ref, onMounted } from 'vue'
  
  const { field, frm } = defineProps(['field', 'frm'])
  frm.setValue(field.fieldname, field.label)
  </script>
  