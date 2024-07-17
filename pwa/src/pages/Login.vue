<template>
  <div class="w-full sm:w-96 bg-[#f4f5f7] flex justify-center items-center h-screen">
    <div class="w-full h-96 flex justify-center items-center">
      <div>
        <div class="w-full object-center justify-center flex">
          <img :src="imageSrc" class="w-16 h-16 object-cover rounded-lg" />
        </div>
        <div class="bg-white rounded-lg w-80 h-68 mt-4">
          <div class="p-4">
            <Input type="email" placeholder="jane@example.com" v-model="email" class="p-2" label="Email"/>
            <div class="relative">
              <Input :type="passwordFieldType" placeholder="...." v-model="password" class="p-2 w-full" label="Password" />
              <span @click="togglePasswordVisibility" class="absolute right-2 top-9 cursor-pointer text-gray-600 text-sm p-2">{{ passwordToggleText }}</span>
            </div>
            <div class="w-full">
              <router-link to="/forget-password" class="pb-1 text-xs text-gray-600 justify-end flex pr-2 hover:underline">Forgot Password?</router-link>
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
              <Button variant="subtle" class="w-full">
                Login with Email Link
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

// Your existing Vue.js code
<script setup>
import { ref, computed } from 'vue';
import { Input, Button, FeatherIcon, createListResource } from 'frappe-ui';

let todos = createListResource({
  doctype: 'ToDo',
  fields: ['name'],
});

todos.reload().then(() => {
  let dataArray = todos.data;
  if (dataArray.length > 0) {
    let firstItem = dataArray[0];
    console.log(firstItem.name);
  }
});

const imageSrc = ref('');  
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const currentURL = ref(window.location.href);
const baseURL = computed(() => {
  const url = new URL(currentURL.value);
  return `${url.protocol}//${url.hostname}`;
});
baseURL.value = baseURL.value+':8001/assets';
const modifiedURL = ref(`${baseURL.value}:8001/assets`);


const myHeaders = new Headers();
myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(modifiedURL.value, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');

    const meta = doc.querySelector('meta[name="generator"]');

    const link = doc.querySelector('link[rel="shortcut icon"]');
    if (link) {
      imageSrc.value = link.href; 
    }
  })
  .catch((error) => console.error(error));

const passwordFieldType = computed(() => (showPassword.value ? 'text' : 'password'));
const passwordToggleText = computed(() => (showPassword.value ? 'Hide' : 'Show'));

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>



<style scoped>
</style>
