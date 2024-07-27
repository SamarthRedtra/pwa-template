<template>
    <div class="w-full sm:w-96 bg-white flex justify-center h-screen">
      <div class="w-full flex flex-col">
        <div class="w-full bg-[#f4f5f7] h-10">
          <div class="p-2 flex">
            <FeatherIcon class="w-6 h-6 text-gray-600 hover:text-black" name="chevron-left" @click="goBack" />
            <p class="font-semibold w-full">Notifications</p>
            <div class="w-full flex justify-end">
              <Avatar
                :shape="'square'"
                :image="null"
                label="Ravi"
                size="lg"
              />
            </div>
          </div>
        </div>
        <div class="w-full p-2 flex-1 overflow-y-auto custom-scrollbar">
          <builder :frm="form" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue'
  import { useFormStore } from '../stores/formStore'
  import builder from '../form/form_builder.vue'
  import { FeatherIcon, Avatar } from 'frappe-ui'
  import { useRouter } from 'vue-router'
  
  const formStore = useFormStore();
  const form = formStore.form;
  const router = useRouter();
  
  const goToNotifications = () => {
    router.push('/notifications')
  }
  
  const goBack = () => {
    router.back();
  };
  
  onMounted(async () => {
    await formStore.initForm();
  });
  </script>
  
  <style scoped>
  .custom-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .custom-scrollbar {
    -ms-overflow-style: none; 
    scrollbar-width: none; 
  }
  </style>
  