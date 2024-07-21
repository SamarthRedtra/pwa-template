<template>
  <div class="p-2">
    <TextInput
      :type="'text'"
      size="sm"
      variant="subtle"
      :placeholder="field.label"
      :disabled="field.read_only"
      :modelValue="value"
	  v-model="value"
    />
  </div>
</template>

<script setup>
import { TextInput } from 'frappe-ui'
import { defineProps, watch, ref, onMounted } from 'vue'

let value = ref("")
const { field, frm } = defineProps(['field', 'frm'])
onMounted(()=>{
	value.value = field.value
})
watch(value, async (newValue, oldValue) => {
	console.log("Watcher Called")
	console.log(`${newValue, oldValue}`)
	frm.trigger(field.fieldname, newValue)
})
</script>
