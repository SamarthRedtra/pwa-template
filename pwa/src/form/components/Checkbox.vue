<template>
  <div class="p-3">
    <Checkbox
      v-model="fieldValue"
      size="sm"
      :label="field.label"
      :disabled="isDisabled"
    />
  </div>
</template>

<script setup>
import { Checkbox } from 'frappe-ui'
import { defineProps, ref, watch, computed, onMounted } from 'vue'

const props = defineProps({
  field: Object,
  frm: Object
})

const fieldValue = ref(0)

const isDisabled = computed(() => {
  return props.field.read_only == 1 || props.frm.Docstatus == 1 || props.frm.Docstatus == 2
})

watch(fieldValue, (newValue) => {
  props.frm.setValue(props.field.fieldname, newValue)
  if(props.field.value){
    if (props.frm.doc[props.field.fieldname] != props.field.value) {
      props.field.value = null;
      props.frm.Saved = 0;
      props.frm.Submit = 0;
      props.frm.Amend = 0;
    }
  }
})

watch(() => props.field.value, (newValue) => {
  if (newValue === 0) {
    fieldValue.value = 0
  } else {
    fieldValue.value = newValue 
  }
}, { immediate: true })

onMounted(() => {
  if (props.field.value) {
    fieldValue.value = props.field.value
  }
})
</script>
