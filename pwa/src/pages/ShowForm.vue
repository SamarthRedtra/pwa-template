<template>
  <div class="w-full flex-1 overflow-y-auto custom-scrollbar">
    <builder :docname="route.query.docname" :frm="form" />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from 'vue'
import { useFormStore } from '../stores/formStore'
import builder from '../form/show_form_builder.vue'
import { useRouter, useRoute } from 'vue-router'

const formStore = useFormStore();
const form = formStore.form;
const router = useRouter();
const route = useRoute();

const goBack = () => {
  router.back();
};

onMounted(async () => {
  await formStore.initForm();
});
</script>

<style scoped>
</style>
