<template>
    <div>
      <Avatar :shape="'square'" :image="null" :label="userName" size="xl"/>
    </div>
  </template>
  
  <script setup>
  import { onMounted, watch, computed } from 'vue'
  import { Avatar, createListResource } from 'frappe-ui'
  import { session } from '../../data/session';
  
  const userName = computed(() => session.user)
  
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

  const userDetails = createListResource({
    doctype: "User",
    fields: ['*'],
    filters: {
      name: userName.value
    }
  })

  userDetails.reload()
  </script>
  
  <style scoped>
  
  </style>
  