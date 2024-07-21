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
	<!-- <Autocomplete
    :options="[
      {
        label: 'John Doe',
        value: 'john-doe',
        image: 'https://randomuser.me/api/portraits/men/59.jpg',
      },
      {
        label: 'Jane Doe',
        value: 'jane-doe',
        image: 'https://randomuser.me/api/portraits/women/58.jpg',
      },
      {
        label: 'John Smith',
        value: 'john-smith',
        image: 'https://randomuser.me/api/portraits/men/59.jpg',
      },
      {
        label: 'Jane Smith',
        value: 'jane-smith',
        image: 'https://randomuser.me/api/portraits/women/59.jpg',
      },
      {
        label: 'John Wayne',
        value: 'john-wayne',
        image: 'https://randomuser.me/api/portraits/men/57.jpg',
      },
      {
        label: 'Jane Wayne',
        value: 'jane-wayne',
        image: 'https://randomuser.me/api/portraits/women/51.jpg',
      },
    ]"
    :v-model="field.value"
    placeholder="Select person"
    hide-search="true"
  /> -->
  </div>
</template>

<script setup>
import { Autocomplete } from 'frappe-ui'
import { defineProps } from 'vue'

// import { onMounted } from 'vue'

// onMounted(() => {
//   console.log(` form builder component is now mounted.`)
//   console.log(field.options);
// })
console.log(` form builder component is now mounted.`)
const { field } = defineProps(['field'])
</script>
