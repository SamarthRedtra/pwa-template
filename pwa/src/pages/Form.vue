<template>
      <div class="w-full flex-1 overflow-y-auto custom-scrollbar">
        <builder :frm="form" />
      </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFormStore } from '../stores/formStore'
import builder from '../form/form_builder.vue'
import { useRouter } from 'vue-router'

const formStore = useFormStore();
const form = formStore.form;
const router = useRouter();

const goBack = () => {
  router.back();
};

onMounted(async () => {
  await formStore.initForm();
});
</script>

<style scoped>
</style>
