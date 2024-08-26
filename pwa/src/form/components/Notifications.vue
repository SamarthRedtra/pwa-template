<template>
  <div class="w-full sm:w-96 bg-white flex justify-center h-screen">
    <div class="w-full sm:w-96 bg-white h-14 shadow-lg fixed top-0 z-10">
      <div class="p-2 flex pt-3">
        <FeatherIcon class="w-8 h-8 text-gray-600 hover:text-black" name="chevron-left" @click="goBack" />
        <p class="font-semibold text-xl pt-[8px] pr-2 truncate w-[15rem]">Notification</p>
        <div class="w-full flex justify-end">
          <div class="p-1 pr-4">
            <FeatherIcon class="w-6 h-6 text-gray-600 hover:text-black" name="bell" />
          </div>
          <User />
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col mt-14 bg-gray-100">
      <div class="w-full p-2 flex-1 overflow-y-auto custom-scrollbar">
        <ul v-if="notifications.length > 0">
          <li @click="opneNotification = true" v-for="(notification, index) in notifications" :key="index" class="bg-white p-2 my-2 rounded hover:cursor-pointer touchable">
            <p class="font-medium">{{ notification.title }}</p>
            <p class="text-sm text-gray-600">{{ notification.message }}</p>
          </li>
        </ul>
        <p v-else class="text-center text-gray-600">No notifications found.</p>
      </div>
    </div>
    <Dialog v-model="opneNotification" class=" z-[210]">
      <template #body-title>
        <h3 class="font-semibold">Notification</h3>
      </template>
      <template #body-content>
        <p>Are you sure you want to delete this file?</p>
      </template>
      <template #actions>
        <div class="w-full bg">
          <Button variant="solid">
            Yes, Delete
          </Button>
          <Button class="ml-2" @click="confirmationDialogVisible = false">
            Cancel
          </Button>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { FeatherIcon, createListResource, createResource, Dialog, Button } from 'frappe-ui'
import User from './User.vue'; 


const fetchNotifications = async () => {
  return [
    { title: "Notification 1", message: "You have a new message." },
    { title: "Notification 2", message: "Your order has been shipped." },
  ];
};


const docs = ref(["Email Queue"])

const opneNotification = ref(false)

const loadData = () => {
	const Links = createListResource({
		doctype: 'PWA Form',
		fields: ['doctype_name'],
	});

	Links.reload().then(() => {
    Links.data.forEach((name) => {
      docs.value.push(name.doctype_name)
    })
    const Notifications = createResource({
      url: 'pwa_template.utils.get_app_notifications',
      method: 'POST',
      params: {
        doctypes: docs.value,
      },
    })

    Notifications.reload()
      .then(() => console.log(Notifications.data))
    });
}

loadData();



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
