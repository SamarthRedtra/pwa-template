<template>
  <div class="w-full sm:w-96 bg-[#f4f5f7] flex justify-center items-center h-screen">
    <div class="w-full h-96 flex justify-center items-center">
      <div>
        <div class="w-full object-center justify-center flex">
          <img :src="imageSrc" class="w-16 h-16 object-cover rounded-lg" />
        </div>
        <div class="w-full">
          <p class="font-medium p-2 flex justify-center">Login to {{ companyName }}</p>
        </div>
        <div class="bg-white rounded-lg w-80 h-68 mt-4">
          <div class="p-4">
            <Input type="email" placeholder="jane@example.com" v-model="email" class="p-2" />
            <div class="relative">
              <Input :type="passwordFieldType" placeholder="...." v-model="password" class="p-2 w-full" />
              <span @click="togglePasswordVisibility" class="absolute right-2 top-2 cursor-pointer text-gray-600 text-sm p-2">{{ passwordToggleText }}</span>
            </div>
            <div class="w-full">
              <router-link to="/forget-password" class="text-xs text-gray-600 justify-end flex pr-2 hover:underline">Forgot Password?</router-link>
            </div>
            <div class="p-2">
              <Button variant="solid" class="w-full">
                Login
              </Button>
            </div>
            <div class="w-full">
              <p class="text-lg text-gray-600 flex justify-center">or</p>
            </div>
            <div class="p-2">
              <Button variant="solid" class="w-full">
                Login with Email Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import img1 from '../assets/Images/fpwa.jpg';
import { Input, Button, FeatherIcon } from 'frappe-ui';

const imageSrc = ref(img1);
const companyName = ref('Frappe - PWA Builder');
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'));
const passwordToggleText = computed(() => (showPassword.value ? 'Hide' : 'Show'));

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style scoped>
/* Additional styles can be added here */
</style>
