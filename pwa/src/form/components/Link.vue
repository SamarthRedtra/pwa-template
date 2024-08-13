<template>
  <div class="p-2">
    <Autocomplete
      :options="fetchedOptions"
      v-model="field.value"
      size="sm"
      variant="subtle"
      :label="field.label"
      :placeholder="field.label"
      :disabled="isDisabled"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
import { Autocomplete, createListResource } from 'frappe-ui'
import { defineProps, ref, watch, computed, onMounted } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const fetchedOptions = ref([])

const fetchOptions = async (query = '') => {
  const resource = createListResource({
    doctype: field.options,
    filters: [['name', 'like', `%${query}%`]],
    fields: ['name'],
    orderBy: 'creation desc',
  })

  resource.reload().then(() => {
    let dataArray = resource.data;
    if (dataArray.length > 0) {
      fetchedOptions.value = dataArray.map(option => option.name)
    } else {
      fetchedOptions.value = []
    }
  })
}

const handleInput = (event) => {
  fetchOptions(event) 
}

const isDisabled = computed(() => {
  return field.read_only == 1 || frm.Docstatus == 1 || frm.Docstatus == 2
})

onMounted(() => {
  fetchOptions()
})

watch(() => field.value, (newValue) => {
  const finalValue = newValue?.value ?? newValue;
  field.value = finalValue
  frm.setValue(field.fieldname, finalValue);
  if(field.value){
    if (frm.doc[field.fieldname] != field.value) {
      field.value = null
      frm.Saved = 0;
      frm.Submit = 0;
      frm.Amend = 0;
    }
  }
})

watch(frm, (newFrm) => {
  if (field.value) {
    field.value = field.value
  }
})
</script>
