<template>
    <div class="w-full sm:w-96 bg-[#f4f5f7] flex justify-center items-center h-screen">
      <div class="w-full h-96 flex justify-center items-center">
        <div>
          <div class="w-full object-center justify-center flex">
            <img :src="imageSrc" class="w-16 h-16 object-cover rounded-lg" />
          </div>
          <div class="w-full">
            <p class="font-medium p-2 flex justify-center">Forget Password</p>
          </div>
          <div class="bg-white rounded-lg w-80 h-68 mt-4">
            <div class="p-4">
              <Input type="email" placeholder="jane@example.com" v-model="email" class="p-2" label="Email" />
              <div class="p-2">
                <Button variant="solid" class="w-full">
                  Reset Password
                </Button>
              </div>
              <div class="w-full">
                <router-link to="/" class="text-sm font-medium text-black justify-center flex p-2 hover:underline">Back to Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
import { ref, computed } from 'vue';
import { Input, Button } from 'frappe-ui';

const imageSrc = ref('');
const email = ref('');
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
</script>
  
<style scoped>
</style>