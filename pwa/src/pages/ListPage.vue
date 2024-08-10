<template>
	<div class="w-full sm:w-96 bg-white flex flex-col items-center h-screen overflow-hidden">
		<div class="w-full sm:w-96 bg-white h-14 shadow-lg fixed top-0 z-10">
			<div class="p-2 flex pt-3">
				<FeatherIcon class="w-8 h-8 text-gray-600 hover:text-black" name="chevron-left" @click="goBack" />
				<p class="font-semibold text-xl pt-[8px] pr-2 truncate w-[10rem]">{{ route.query.doctype }}</p>
				<div class="w-full flex justify-end">
					<div class="p-1 pr-4">
						<FeatherIcon class="w-6 h-6 text-gray-600 hover:text-black" name="bell" />
					</div>
					<User />
				</div>
			</div>
		</div>
		
		<div class="w-full flex-1 bg-gray-200 mt-14 overflow-hidden">
			<div class="p-4">
				<div class="flex bg-white p-2 rounded-lg items-center">
					<FeatherIcon name="list" class="w-5 h-5 text-gray-600" />
					<div class=" w-[10rem] ml-2">
						<TextInput
							class="truncate"
							type="text"
							size="sm"
							variant="subtle"
							placeholder="ID"
							v-model="id"
						/>
					</div>
					<FeatherIcon name="filter" class="w-5 h-5 text-gray-600 ml-auto hover:text-black hover:cursor-pointer" @click="dialog2 = true" />
					<FeatherIcon name="refresh-ccw" class="w-5 h-5 text-gray-600 ml-[1rem] hover:text-black hover:cursor-pointer" @click="refreshData"/>
					<FeatherIcon name="plus" class="w-5 h-5 text-gray-600 ml-[1rem] hover:text-black hover:cursor-pointer" @click="handelNew"/>
				</div>                
				<div class="bg-white h-[32rem] w-full rounded-lg mt-2 p-2">
					<div class="h-[28rem] overflow-y-auto no-scrollbar">
						<div v-for="report in reports" :key="report.id" class="border-gray-200 border-b-[1.5px]">
							<div class="p-2 flex pt-2 items-center">
								<FeatherIcon name="file-text" class="text-gray-600 h-5 w-5" />
								<div class="flex flex-col pl-3">
									<p class="text-black truncate w-[8rem]">{{ report.name }}</p>
									<div class="flex space-x-2">
										<p class="text-gray-600 text-[10px] truncate w-[4rem]">{{ report.owner }}</p>
										<p class="text-gray-600 text-[10px] truncate w-[4rem]">{{ report.creation }}</p>
									</div>
								</div>
								<div v-if="report.amended_from_value" class="ml-auto">
									<div v-if="report.docstatus === 0" class="p-1 pl-2 pr-2 bg-red-300 rounded-xl">
										<p class="text-[12px] text-red-700">Draft</p>
									</div>
									<div v-else-if="report.docstatus === 1" class="p-1 pl-2 pr-2 bg-blue-300 rounded-xl">
										<p class="text-[12px] text-blue-700">Submitted</p>
									</div>
									<div v-else-if="report.docstatus === 2" class="p-1 pl-2 pr-2 bg-red-300 rounded-xl">
										<p class="text-[12px] text-red-700">Cancelled</p>
									</div>
								</div>
								<div :class="!report.amended_from_value ? 'touchable ml-auto' : 'touchable ml-[20px]'" @click="handleClick(report)">
									<FeatherIcon name="arrow-right" class="text-gray-600 h-5 w-5 hover:text-black" />
								</div>                                
							</div>
						</div>
					</div>
					<div class="border-gray-200 border-[1.5px] p-1 mb-2 mt-2 flex rounded-xl w-fit">
						<div class="border-r-[1.5px] border-gray-200 touchable" data-number="20" @click="printNumber(20)">
							<p class="text-[14px] pr-2 pl-2">20</p>
						</div>
						<div class="border-r-[1.5px] border-gray-200 touchable" data-number="100" @click="printNumber(100)">
							<p class="text-[14px] pr-2 pl-2">100</p>
						</div>
						<div class="touchable" data-number="500" @click="printNumber(500)">
							<p class="text-[14px] pr-2 pl-2">500</p>
						</div>
					</div>                    
				</div>
			</div>
		</div>
		<Dialog v-model="dialog2" :options="{size: 'sm'}">
			<template #body-title>
				<h1 class="font-bold text-[25px]">Filters</h1>
			</template>
			<template #body-content>
				<div class="flex p-[3rem] flex-col justify-center h-[10rem] mt-[1rem] overflow-y-auto no-scrollbar">
					<div v-for="(filter, index) in filters" :key="index" class="flex p-2 justify-center">
						<div class="p-2">
							<Autocomplete
								class="truncate w-[5rem] "
								:options="filter.options"
								v-model="filter.selectedPerson"
								placeholder="Feild"
							/>
						</div>
						<div class="p-2">
							<Autocomplete
								class="truncate w-[5rem] "
								:options="conditionsOptions"
								v-model="filter.selectedCondition"
								placeholder="Equals"
								hide-search="true"
							/>
						</div>
						<div class="p-2">
							<TextInput
								class="truncate w-[5rem] "
								type="text"
								size="sm"
								variant="subtle"
								placeholder="value"
								v-model="filter.value"
							/>
						</div>
						<div class="p-2">
							<FeatherIcon name="x" class="w-5 h-5 text-gray-600 hover:text-black" @click="handleRemoveFilter(index)" />
						</div>                        
					</div>
				</div>
			</template>
			<template #actions>
				<div class="flex border-t-[1.5px] border-gray-200 p-2">
					<FeatherIcon name="plus" class="w-6 h-6 text-gray-600 hover:text-black" @click="handleAddFilter" />
					<Button class="ml-auto" variant="solid" @click="handleConfirm">
						Confirm
					</Button>
					<Button class="ml-2" @click="dialog2 = false">
						Close
					</Button>
				</div>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { FeatherIcon, createListResource, Dialog, TextInput, Button, Autocomplete } from 'frappe-ui';
import User from "../form/components/User.vue";
import { useRoute, useRouter } from 'vue-router';

const reports = ref([]);
const router = useRouter();
const selectedNumber = ref(20);
const route = useRoute();
const dialog2 = ref(false);
const id = ref('');

watch(id, (newId) => {
	loadData()
})

const loadData = () => {
	const filters = id.value ? { name: id.value } : {};

	const Doctype = createListResource({
		doctype: route.query.doctype,
		fields: ['*'],
		orderBy: 'creation desc',
		filters: filters,
		start: 0,
		pageLength: selectedNumber.value,   
	});

	Doctype.reload().then(() => {
		const amended_from = ref(false);

		Doctype.data.forEach(item => {
			Object.entries(item).forEach(([key, value]) => {
				if (key === 'amended_from') {
					amended_from.value = true;
				}
			});
		});

		reports.value = Doctype.data.map(item => ({
			name: item.name,
			owner: item.owner,
			creation: item.creation,
			docstatus: item.docstatus,
			amended_from_value: amended_from.value ? 1 : 0,
		}));
	});
};

loadData();

const handleClick = (report) => {
	router.push({
		name: 'Showform',
		query: {
			frmname: route.query.frmname,
			doctype: route.query.doctype,
			docname: report.name
		}
	})
};

const filterData = ref([]);


const handelNew = () => {
	router.push({
		name: 'Form',
		query: {
			frmname: route.query.frmname,
			doctype: route.query.doctype,
		}
	});
}

const handleConfirm = () => {
    filterData.value = filters.value.map(filter => ({
        field: filter.selectedPerson,
        condition: filter.selectedCondition,
        value: filter.value,
    }));
    console.log(filterData.value);
    dialog2.value = false;
};


const printNumber = (number) => {
	selectedNumber.value = number;
	loadData();  
};

const handleRemoveFilter = (index) => {
	filters.value.splice(index, 1);
};


const goBack = () => {
	router.push({
		name: 'LandingPage'
	});
};  

const refreshData = () => {
	loadData(); 
};

const filters = ref([
	{
		options: [
			{ label: 'John', value: 'john-doe' },
		],
		selectedPerson: null,
		selectedCondition: 'Equals', // Set default to "Equals"
		value: '',
	},
]);

const conditionsOptions = [
	{ label: 'Equals', value: 'equals' },
	{ label: 'Not Equals', value: 'not_equals' },
	{ label: 'Like', value: 'like' },
	{ label: 'Not Like', value: 'not_like' },
	{ label: 'In', value: 'in' },
	{ label: 'Not In', value: 'not_in' },
	{ label: 'Is', value: 'is' },
];

const handleAddFilter = () => {
	filters.value.push({
		options: [
			{ label: 'John', value: 'john-doe' },
		],
		selectedPerson: null,
		selectedCondition: 'Equals',
		value: '',
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
</style>
