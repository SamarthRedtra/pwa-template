<template>
  <div class="w-full sm:w-96 bg-white flex justify-center p-2 h-screen">
    <div class="w-full p-2">
      <builder :frm="form"/>
    </div>
  </div>
</template>

<script setup>
import { useFormStore } from '../stores/formStore'
import builder from '../form/form_builder.vue'

const formStore = useFormStore()
const form = formStore.form

// console.log(form.fields)
</script>
