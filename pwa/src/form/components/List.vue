<template>
  <div class="bg-white h-[32rem] w-full rounded-lg mt-2 p-2">
    <div class="h-[28rem] overflow-y-auto no-scrollbar">
      <div v-if="isLoading" class="flex justify-center text-center content-center">
        <div class="flex mt-[14rem]">
          <Spinner class="w-4" />
          <p class="text-4 pl-2 text-gray-600">Loading</p>
        </div>
      </div>
      <div v-else>
        <div v-if="reports.length <= 0" class="flex justify-center items-center h-full text-center">
          <p class="text-gray-600 text-sm mt-[14rem]">No Record Found</p>
        </div>
        <div v-else>
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
              <div v-if="report.workflow_state" class="ml-auto">
                <div :class="styleClass" class="ml-auto">
                  <p :class="styleTextClass">{{ report.workflow_state }}</p>
                </div>
              </div>
              <div v-else class="ml-auto">
                <div v-if="report.amended_from_value" class="ml-auto">
                  <div v-if="report.docstatus === 0" class=" w-[4rem] ">
                    <div  class=" border-[0.5px] border-red-500 rounded-md text-center w-[3rem]">
                      <p class="text-[10px] text-red-600">Draft</p>
                    </div>
                  </div>
                  <div v-else-if="report.docstatus === 1" class=" border-blue-500 border-[0.5px] rounded-md px-2">
                    <p class="text-[10px] text-blue-600">Submitted</p>
                  </div>
                  <div v-else-if="report.docstatus === 2" class=" border-red-500 border-[0.5px] rounded-md px-2">
                    <p class="text-[10px] text-red-600">Cancelled</p>
                  </div>
                </div>
              </div>
              <div class="ml-auto" @click="handleClickInternal(report)">
                <FeatherIcon name="arrow-right" class="text-gray-600 h-5 w-5 hover:text-black hover:cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="border-gray-200 border-[1.5px] p-1 mb-2 mt-2 flex rounded-xl w-fit">
      <div class="border-r-[1.5px] border-gray-200 touchable" data-number="20" @click="printNumberInternal(20)">
        <p class="text-[14px] pr-2 pl-2 hover:cursor-pointer">20</p>
      </div>
      <div class="border-r-[1.5px] border-gray-200 touchable" data-number="100" @click="printNumberInternal(100)">
        <p class="text-[14px] pr-2 pl-2 hover:cursor-pointer">100</p>
      </div>
      <div class="touchable" data-number="500" @click="printNumberInternal(500)">
        <p class="text-[14px] pr-2 pl-2 hover:cursor-pointer">500</p>
      </div>
    </div>
  </div>                                                            
</template>

<script setup>
import { FeatherIcon, Spinner, createListResource } from 'frappe-ui';
import { defineProps, defineEmits, watch, ref, computed } from 'vue';

const props = defineProps({
  reports: Array
});


const emit = defineEmits(['handle-click', 'print-number']);
const reports = ref(props.reports);
const isLoading = ref(true);

watch(() => props.reports, (newReports) => {
  reports.value = newReports;
  isLoading.value = false;
});

const style = ref('');




const styleClass = computed(() => {
  switch (style.value) {
    case 'Success': return 'bg-green-200 h-[2rem] rounded-2xl text-center';
    case 'Danger': return 'bg-red-200 h-[2rem] rounded-2xl text-center';
    case 'Inverse': return 'bg-black h-[2rem] rounded-2xl text-center';
    case 'Warning': return 'bg-orange-200 h-[2rem] rounded-2xl text-center';
    case 'Info': return 'bg-blue-200 h-[2rem] rounded-2xl text-center';
    case 'Primary': return 'bg-[#9fa8da] h-[2rem] rounded-2xl text-center';
    default: return 'bg-gray-200 h-[2rem] rounded-2xl text-center';
  }
});

const styleTextClass = computed(() => {
  switch (style.value) {
    case 'Success': return 'p-2 text-sm w-20 text-green-500';
    case 'Danger': return 'p-2 text-sm w-20 text-red-500';
    case 'Inverse': return 'p-2 text-sm w-20 text-white';
    case 'Warning': return 'p-2 text-sm w-20 text-orange-500';
    case 'Info': return 'p-2 text-sm w-20 text-blue-500';
    case 'Primary': return 'p-2 text-sm w-20 text-[#1a237e]';
    default: return 'p-2 text-sm w-20 text-gray-500';
  }
});

const handleClickInternal = (report) => {
  emit('handle-click', report);
};

const printNumberInternal = (number) => {
  emit('print-number', number);
};

watch(() => reports.value, (newReports) => {
  newReports.forEach((report) => {
    if (report.workflow_state) {
      createListResource({
        doctype: 'Workflow State',
        filters: { name: report.workflow_state },
        fields: ['*']
      }).reload().then((res) => {
        style.value = res[0].style;
      });
    }
  });
});

</script>
