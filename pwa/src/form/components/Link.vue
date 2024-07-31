<template>
  <div class="p-2">
    <Autocomplete
      :options="fetchedOptions"
      v-model="autocompleteValue"
      size="sm"
      variant="subtle"
      :label="field.label"
      :placeholder="field.label"
      :disabled="field.read_only"
      @input="handleInput"
    />
  </div>
</template>

<script setup>
import { Autocomplete, createListResource } from 'frappe-ui'
import { defineProps, ref, watch, onMounted } from 'vue'

const { field, frm } = defineProps(['field', 'frm'])

const fetchedOptions = ref([])
const autocompleteValue = ref(field.value || '')

const fetchOptions = async (query = '') => {
  const resource = createListResource({
    doctype: field.options,
    filters: [['name', 'like', `%${query}%`]],
    fields: ['name'],
    orderBy: 'creation desc',
  })

  try {
    await resource.reload()
    fetchedOptions.value = resource.data.map(option => option.name)
  } catch (error) {
    console.error('Error fetching options:', error)
    fetchedOptions.value = []
  }
}

const handleInput = (event) => {
  fetchOptions(event)
}

onMounted(() => {
  fetchOptions()
})

watch(autocompleteValue, (newValue) => {
  frm.setValue(field.fieldname, newValue)
})
</script>
