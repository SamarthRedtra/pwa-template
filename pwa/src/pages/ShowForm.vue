<template>
  <div class="w-full flex-1 overflow-y-auto custom-scrollbar">
    <builder v-if="form" :docname="route.query.docname" :frm="form" :doctype="route.query.doctype" :frmname="route.query.frmname" />
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch, computed } from 'vue'
import { useFormStore } from '../stores/formStore'
import builder from '../form/show_form_builder.vue'
import { useRouter, useRoute } from 'vue-router'

const formStore = useFormStore();
const form = computed(() => formStore.form);
const route = useRoute();


onMounted(async () => {
  await formStore.initForm();
});
</script>

<style scoped>
</style>
