<template>
<div class="w-full sm:w-96 bg-gray-100 flex justify-center h-screen">
	<div class="w-full flex flex-col">
	<div class="w-full sm:w-96 bg-white h-14 shadow-lg fixed top-0 z-10">
		<div class="p-2 flex pt-3">
		<FeatherIcon class="w-6 h-6 mt-1 text-gray-600 hover:text-black" name="list" />
		<FormControl
			:type="'search'"
			size="sm"
			variant="subtle"
			placeholder="Search..."
			:disabled="false"
			v-model="inputValue"
			class="flex-grow pl-4 w-full pt-[3px]"
		>
			<template #prefix>
			<FeatherIcon class="w-4" name="search" />
			</template>
		</FormControl>
		<div class="w-full flex justify-end">
			<div class="p-1 pr-4 mb-2">
			<FeatherIcon class="w-6 h-6 text-gray-600 pt-1 hover:text-black" name="bell" />
			</div>
			<User />
		</div>
		</div>
	</div>
	<div class="mt-14 w-full h-full">
		<div class="p-4">
		<p class="font-medium text-xl pl-1 text-gray-600">Quick Link</p>
		<div class="bg-white h-[28rem] w-full rounded-lg mt-2 overflow-y-auto no-scrollbar p-2">
			<div v-for="link in links" :key="link.id" class="border-gray-200 border-b-[1.5px]">
			<div class="p-2 flex pt-2">
				<FeatherIcon name="link" class="text-gray-600 h-5 w-5" />
				<p class="text-gray-600 pl-3 truncate w-[8rem]">{{ link.doctype }}</p>
				<div class="ml-auto touchable" @click="navigateToForm(link)">
				<FeatherIcon name="arrow-right" class="text-gray-600 h-5 w-5 hover:text-black" />
				</div>
			</div>
			</div>
		</div>
		</div>
	</div>
	</div>
</div>
</template>  
<script setup>
import { ref } from 'vue';
import User from "../form/components/User.vue";
import { FeatherIcon, FormControl, createListResource } from "frappe-ui";
import { useRouter } from 'vue-router';

const inputValue = ref('');
const links = ref([]);
const router = useRouter();

const Links = createListResource({
  doctype: 'PWA Form',
  fields: ['*'],
});

Links.reload().then(() => {
  links.value = Links.data.map(item => ({
	id: item.name,
	frm: item.form_name,
	doctype: item.doctype_name,
  }));
});

const navigateToForm = (link) => {
  router.push({
	name: 'ListPage',
	query: {
	  frmname: link.frm,
	  doctype: link.doctype,
	}
  });
};
</script>
<style scoped>
	.no-scrollbar::-webkit-scrollbar {
		display: none;
	}
	.no-scrollbar {
		-ms-overflow-style: none;  
		scrollbar-width: none; 
	}
	.touchable {
		cursor: pointer;
	}
</style>