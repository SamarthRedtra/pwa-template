<template>
  <div>
    <Avatar :shape="'square'" :image="ImageUrl" :label="userName" size="xl"/>
  </div>
</template>

<script setup>
import { onMounted, watch, computed, ref } from 'vue'
import { Avatar, createListResource } from 'frappe-ui'
import { session } from '../../data/session';

const userName = computed(() => session.user)
const imageBaseUrl = ref('')

onMounted(() => {
  if (userName.value) {
  //   console.log('User name:', userName.value)
  }
})

watch(userName, (newValue) => {
  if (newValue) {
  //   console.log('User name:', newValue)
  }
})

const currentURL = ref(window.location.href);
const baseURL = computed(() => {
  const url = new URL(currentURL.value);
  return `${url.protocol}//${url.hostname}`;
});

const ImageUrl = computed(() => {
  return imageBaseUrl.value ? `${baseURL.value}:8001${imageBaseUrl.value}` : '';
});

const userDetails = createListResource({
  doctype: "User",
  fields: ['*'],
  filters: {
    name: userName.value
  }
})

userDetails.reload()
  .then(() => {
    imageBaseUrl.value = userDetails.data[0].user_image || '';
  })
</script>

<style scoped>

</style>
