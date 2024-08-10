<template>
  <div class="w-full flex-1 overflow-y-auto custom-scrollbar">
    <builder v-if="form" :frm="form" :frnname="route.query.frmname" :doctype="route.query.doctype" />
    <p v-else>Loading...</p>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useFormStore } from '../stores/formStore';
import builder from '../form/form_builder.vue';
import { useRoute, useRouter } from 'vue-router';

const formStore = useFormStore();
const form = computed(() => formStore.form);
const route = useRoute();

onMounted(async () => {
  await formStore.initForm();
});
</script>

<style scoped>
</style>
