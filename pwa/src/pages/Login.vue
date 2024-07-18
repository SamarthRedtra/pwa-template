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
            <div v-if="formSubmitted && !emailValid" class="text-red-500 text-xs pl-2">Enter a valid email</div>
            <div class="relative">
              <Input :type="passwordFieldType" placeholder="...." v-model="password" class="p-2 w-full" label="Password" />
              <span @click="togglePasswordVisibility" class="absolute right-2 top-9 cursor-pointer text-gray-600 text-sm p-2">{{ passwordToggleText }}</span>
            </div>
            <div v-if="formSubmitted && !passwordValid" class="text-red-500 text-xs pl-2">Enter password</div>
            <div class="w-full">
              <router-link to="/forget-password" class="pb-1 text-xs text-gray-600 justify-end flex pr-2 hover:underline">Forgot Password?</router-link>
            </div>
            <div class="p-2">
              <Button variant="solid" class="w-full" @click="login">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed bottom-0 flex justify-end w-full sm:w-96">
    <transition name="fade">
      <div v-if="loginSuccess" class="w-full sm:w-72 p-2 mb-4 text-sm leading-5 text-white bg-green-400 rounded-lg opacity-100 font-regular animate-slide-in-right animate-fade-out">
        Login successfully
      </div>
    </transition>
    <transition name="fade">
      <div v-if="loginError" class="w-full sm:w-72 p-2 mb-4 text-sm leading-5 text-white bg-red-400 rounded-lg opacity-100 font-regular animate-slide-in-right animate-fade-out">
        Login failed
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Input, Button, createListResource } from 'frappe-ui';

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
const loginSuccess = ref(false);
const loginError = ref(false);
const formSubmitted = ref(false);

const emailValid = computed(() => {
  return email.value.includes('@') || email.value === 'Administrator';
});
const passwordValid = computed(() => !!password.value);

const currentURL = ref(window.location.href);
const baseURL = computed(() => {
  const url = new URL(currentURL.value);
  return `${url.protocol}//${url.hostname}`;
});
baseURL.value = baseURL.value + ':8001/assets';
const modifiedLogoURL = ref(`${baseURL.value}:8001/assets`);
const modifiedLoginURL = ref(`${baseURL.value}:8001/Login`);

const myHeaders = new Headers();
myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

fetch(modifiedLogoURL.value, requestOptions)
  .then((response) => response.text())
  .then((result) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(result, 'text/html');

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

const login = () => {
  formSubmitted.value = true;

  if (!emailValid.value || !passwordValid.value) return;

  const Header = new Headers();
  Header.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "cmd": "login",
    "usr": email.value,
    "pwd": password.value
  });

  const request = {
    method: "POST",
    headers: Header,
    body: raw,
    redirect: "follow"
  };

  fetch(modifiedLoginURL.value, request)
    .then((response) => response.json())
    .then((result) => {
      if (result.message === "Logged In") {
        loginSuccess.value = true;
        loginError.value = false;
      } else {
        loginSuccess.value = false;
        loginError.value = true;
      }
      setTimeout(() => {
        loginSuccess.value = false;
        loginError.value = false;
      }, 1000); 
    })
    .catch((error) => {
      console.error(error);
      loginSuccess.value = false;
      loginError.value = true;
      setTimeout(() => {
        loginSuccess.value = false;
        loginError.value = false;
      }, 1000);
    });
};
</script>

<style scoped>
</style>
