<template>
  <div class="p-2">
    <Badge
      :type="'text'"
      size="lg"
      theme="gray"
      :variant="'ghost'"
      :label="value"
    >
      {{ field.label }}
    </Badge>
  </div>
</template>

<script setup>
import { Badge } from 'frappe-ui'
import { defineProps, ref, watch, onMounted } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const value = ref(frm.doc[field.fieldname] || field.label)

onMounted(() => {
  frm.setValue(field.fieldname, value.value)
})

watch(value, (newValue) => {
  frm.setValue(field.fieldname, newValue)
})
</script>
