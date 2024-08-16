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
        <div v-if="props.reports.length === 0" class="flex justify-center items-center h-full">
          <p class="text-gray-600 text-lg">No Report Found</p>
        </div>
        <div v-else>
          <div v-for="report in props.reports" :key="report.id" class="border-gray-200 border-b-[1.5px]">
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
                <div v-if="report.docstatus === 0" class="p-1 pl-2 pr-2 bg-red-300 rounded-xl w-[4.3rem] text-center">
                  <p class="text-[12px] text-red-700">Draft</p>
                </div>
                <div v-else-if="report.docstatus === 1" class="p-1 pl-2 pr-2 bg-blue-300 rounded-xl">
                  <p class="text-[12px] text-blue-700">Submitted</p>
                </div>
                <div v-else-if="report.docstatus === 2" class="p-1 pl-2 pr-2 bg-red-300 rounded-xl">
                  <p class="text-[12px] text-red-700">Cancelled</p>
                </div>
              </div>
              <div :class="!report.amended_from_value ? 'touchable ml-auto' : 'touchable ml-[20px]'" @click="handleClickInternal(report)">
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
import { FeatherIcon, Spinner } from 'frappe-ui';
import { defineProps, defineEmits, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  reports: Array
});
const emit = defineEmits(['handle-click', 'print-number']);
const router = useRouter();
let isLoading = true;

const handleClickInternal = (report) => {
  emit('handle-click', report);
};

const printNumberInternal = (number) => {
  emit('print-number', number);
};

watch(
  () => props.reports,
  (newReports) => {
    if (newReports) {
      isLoading = false;
    } else {
      isLoading = true;
      setTimeout(() => {
        if (isLoading) {
          if (window.confirm('Something went wrong! Would you like to go back?')) {
            router.push({name: 'LandingPage'});
          }
        }
      }, 4000);
    }
  },
  { immediate: true }
);
</script>
