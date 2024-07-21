<template>
	<builder :frm="form"/>

</template>

<script setup>
import builder from '../form/form_builder.vue'
import Form from '../form/base_form.js'
import { ref } from 'vue'
const form = ref(new Form("Test Form"))
console.log(form.fields)
</script>
