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
        <ul v-if="notifications.length > 0">
          <li v-for="(notification, index) in notifications" :key="index" class="bg-gray-100 p-2 my-2 rounded">
            <p class="font-medium">{{ notification.title }}</p>
            <p class="text-sm text-gray-600">{{ notification.message }}</p>
          </li>
        </ul>
        <p v-else class="text-center text-gray-600">No notifications found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FeatherIcon, Avatar } from 'frappe-ui'

// Mock API Call function (replace with actual API call)
const fetchNotifications = async () => {
  // Replace with the actual API endpoint and logic to fetch notifications from Frappe
  return [
    { title: "Notification 1", message: "You have a new message." },
    { title: "Notification 2", message: "Your order has been shipped." },
  ];
};

const notifications = ref([]);
const router = useRouter();

const goToNotifications = () => {
  router.push('/notifications');
};

const goBack = () => {
  router.back();
};

onMounted(async () => {
  // Fetch notifications on component mount
  notifications.value = await fetchNotifications();
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
