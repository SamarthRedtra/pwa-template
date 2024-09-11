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
			<div class="w-full h-full p-4 flex-1 overflow-y-auto custom-scrollbar">
				<ul v-if="notifications.length > 0">
					<div class="w-full p-2">
						<Button class="ml-[16.5rem]" variant="solid" size="sm" @click="clearAllNotifications"> clear all </Button>
					</div>
					<li v-for="(notification, index) in notifications" :key="index" 
							@click="notifiedRecord(notification)"
							:class="{
								'transition-all duration-500 ease-in-out transform translate-x-full opacity-0': clearing || notification.clearing,
								'bg-white p-4 my-2 rounded hover:cursor-pointer touchable transition-all duration-500 ease-in-out': true
							}">
						<div class="flex">
							<p class="font-medium">{{ notification.title }}</p>
							<FeatherIcon name="x" class="h-5 w-5 ml-auto mr-2 text-red-700" @click="deleteNotification(index)" />
						</div>
						<p class="text-sm mt-2 text-gray-600">{{ notification.message }}</p>
					</li>
				</ul>
				<div v-else class="h-full flex justify-center items-center">
					<p class="text-gray-600">No notifications found.</p>
				</div>
			</div>
		</div>

		<Dialog v-model="opneNotification" class="z-[210]">
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
import { FeatherIcon, createListResource, Dialog, Button } from 'frappe-ui'
import { exportedData } from '../../json/exported-pwaJSON';
import User from './User.vue'; 

const notifications = ref([]);
const opneNotification = ref(false);
const clearing = ref(false);
const docwithfrms = ref({})
const router = useRouter();


const loadData = async () => {
	const exportedJSON = await exportedData();
	Object.values(exportedJSON).forEach(values => {
		docwithfrms.value[values.doctype_name] = values.form_name;
	});
	const docs = ["Email Queue", ...Object.keys(exportedJSON)];

	const getNotification = createListResource({
		doctype: 'Notification Log',
		filters: { document_type: ["in", docs] },
		fields: ['*']
	});

	await getNotification.reload();
	
	notifications.value = getNotification.data
	.filter(notifieData => !notifieData.read)
	.map(notifieData => ({
		title: notifieData.document_type,
		message: notifieData.subject,
		name: notifieData.name,
		document_name: notifieData.document_name,
		clearing: false
	}));

};

onMounted(loadData);

const notifiedRecord = (notification) => {
	if(docwithfrms.value[notification.title]){
		router.push({
			name: 'Showform',
			query: {
				frmname: docwithfrms.value[notification.title],
				doctype: notification.title,
				docname: notification.documnet_name
			}
		})
	}
	}

const clearNotification = (docName) => {
	const clear = createListResource({
		doctype: 'Notification Log'
	});
	
	clear.setValue.submit({
		name: docName,
		read: 1
	});
};


const clearAllNotifications = () => {
	clearing.value = true;
	notifications.value.forEach( (notifie) => {
		 clearNotification(notifie.name)
	} )

	setTimeout(() => {
		notifications.value = [];
		clearing.value = false;
	}, 1000);
};

const deleteNotification = (index) => {
	notifications.value[index].clearing = true;
	setTimeout(() => {
		notifications.value.splice(index, 1);
	}, 500);
};


const goBack = () => {
	router.back();
};
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
