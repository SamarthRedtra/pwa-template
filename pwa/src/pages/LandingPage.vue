<template>
	<div class="w-full sm:w-96 bg-gray-100 flex justify-center h-screen">
	  <div class="w-full flex flex-col">
		<div class="w-full sm:w-96 bg-white h-14 shadow-lg fixed top-0 z-10">
		  <div class="p-2 flex pt-3">
			<FeatherIcon class="w-6 h-6 mt-1 text-gray-600 hover:text-black" name="list" />
			<div class="relative w-full">
			  <FormControl
				:type="'text'"
				size="sm"
				variant="subtle"
				placeholder="Search..."
				:disabled="false"
				v-model="inputValue"
				@focus="showDropdown = true"
				class="flex-grow pl-4 w-full pt-[3px]"
			  >
				<template #prefix>
				  <FeatherIcon class="w-4" name="search" />
				</template>
			  </FormControl>
			  <div v-if="showDropdown" class="absolute left-[1rem] right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-20">
				<div v-if="options.length > 0" v-for="option in options" :key="option" class="p-2 hover:bg-gray-200 cursor-pointer" @click="selectOption(option)">
				  {{ option.doctype_name }}
				</div>
				<div v-else class="p-2 hover:bg-gray-200 cursor-pointer text-[12px] text-gray-600" @click="selectOption(option)">
					No Record Found
				</div>
			  </div>
			</div>
			<div class="w-full flex justify-end">
			  <div class="p-1 pr-4 mb-2">
				<FeatherIcon class="w-6 h-6 text-gray-600 pt-1 hover:text-black" name="bell" @click = "goToNotifications"/>
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
					<div class="p-2 flex pt-2 touchable" @click="navigateToForm(link)">
						<FeatherIcon name="link" class="text-gray-600 h-5 w-5" />
						<p class="text-gray-600 pl-3 truncate w-[8rem]">{{ link.doctype }}</p>
						<div class="ml-auto touchable" @click.stop="handelNew(link)">
							<FeatherIcon name="plus" class="text-gray-600 h-5 w-5 hover:text-black" />
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
import { ref, watch } from 'vue';
import User from "../form/components/User.vue";
import { FeatherIcon, FormControl, createListResource, createResource } from "frappe-ui";
import { useRouter } from 'vue-router';

const goToNotifications = () => {
  router.push('/notifications')
}

const inputValue = ref('');
const showDropdown = ref(false);
const links = ref([]);
const options = ref([]); 
const router = useRouter();
const Name = ref('');
const filterValue = ref([])

const loadData = () => {
	const Links = createListResource({
		doctype: 'PWA Form',
		fields: ['*'],
		filters: Name.value ? { name: Name.value } :{}
	});

	Links.reload().then(() => {
		links.value = Links.data.map(item => ({
			id: item.name,
			frm: item.form_name,
			doctype: item.doctype_name,
		}));
	});
}

loadData();

watch(inputValue, (newValue) => {
	filterValue.value = ['PWA Form', "doctype_name", "like", `%${newValue}%`]
	loadOptions()

});

const selectOption = (option) => {
	inputValue.value = option.doctype_name;
	router.push({
		name: 'ListPage',
		query: {
			frmname: option.name,
			doctype: option.doctype_name,
		}
	});
	showDropdown.value = false;
};
const navigateToForm = (link) => {
	router.push({
		name: 'ListPage',
		query: {
			frmname: link.frm,
			doctype: link.doctype,
		}
	});
};

const handelNew = (link) => {
	router.push({
		name: 'Form',
		query: {
			frmname: link.frm,
			doctype: link.doctype,
		}
	});
}

const loadOptions = () => {
	const opt = createResource({
		url: 'frappe.desk.reportview.get',
		method: 'POST',
		params: {
			doctype: 'PWA Form',
			filters: filterValue.value.length > 0 ? [filterValue.value] : [],
			fields: ["*"],
			distinct: false,
			start: 0,
			page_length: filterValue.value.length > 0 ? 500 : 5,
		},
	});

	opt.fetch().then(() => {
		const data = opt.data;
		if (data.values) {
			if(data.values.map){
				options.value = data.values.map(row => ({
					name: row[0],
					doctype_name: row[9],
				}));
			}
			else{
				options.value = []
			}
		}
	});
};


loadOptions()


document.addEventListener('click', (event) => {
	const target = event.target;
	if (!target.closest('.relative')) {
		showDropdown.value = false;
	}
});
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