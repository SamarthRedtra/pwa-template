<template>
  <div class="w-full sm:w-96 bg-white flex justify-center h-screen">
    <div class="w-full flex flex-col">
      <div class="w-full sm:w-96 bg-gray-200 h-14 shadow-lg fixed top-0 z-10">
        <div class="p-2 flex pt-3">
          <FeatherIcon class="w-8 h-8 text-gray-600 hover:text-black" name="chevron-left" @click="goBack" />
          <p class="font-semibold w-full text-xl pt-1.5">{{ frm.doctype }}</p>
          <div class="w-full flex justify-end">
            <div class="p-1 pr-4">
              <FeatherIcon class="w-6 h-6 text-gray-600 hover:text-black" name="bell" />
            </div>
            <Avatar :shape="'square'" :image="null" label="Ravi" size="xl"/>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto custom-scrollbar pt-16 pb-14 p-2">
        <component
          v-for="field in filteredFields"
          :key="field.fieldname"
          :is="fieldMap[field.fieldtype]"
          :field="field"
          :frm="frm"
        ></component>
      </div>

      <div class="flex w-full sm:w-96 pl-5 pb-2 pt-1 fixed bottom-0 z-10 bg-gray-200 shadow-lg">
        <div class="pt-1">
          <Button
            :variant="'solid'"
            theme="gray"
            size="sm"
            label="Button"
            :loading="false"
            :loadingText="null"
            :disabled="false"
            :link="null"
            class="w-[21rem] h-[35px] p-2"
            @click="save"
          >
            Save
          </Button>
        </div>
        <div class="p-2 pl-0 pt-2.5">
          <Dropdown
            :options="dropdownOptions"
          >
            <Button>
              <template #icon>
                <FeatherIcon
                  name="more-vertical"
                  class="h-6 w-6 text-gray-600 hover:text-black"
                />
              </template>
            </Button>
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed, ref, h } from 'vue'
import Text from './components/Text.vue'
import Select from './components/Select.vue'
import Badge from './components/Badge.vue'
import Int from './components/Int.vue'
import DateTime from './components/DateTime.vue'
import Autocomplete from './components/Autocomplete.vue'
import SectionBreak from './components/SectionBreak.vue'
import Date from './components/Date.vue'
import Checkbox from './components/Checkbox.vue'
import Textarea from './components/Textarea.vue'
import Float from './components/Float.vue'
import Link from './components/Link.vue'
import Currency from './components/Currency.vue'
import { useRouter } from 'vue-router'
import { FeatherIcon, Avatar, Dropdown, Button } from 'frappe-ui'

const props = defineProps({
  frm: Object
})

const fieldMap = {
  Data: Text,
  Select: Select,
  Int: Int,
  Autocomplete: Autocomplete,
  Dynamic_Link: Select,
  Heading: Badge,
  Datetime: DateTime,
  Date: Date,
  'Section Break': SectionBreak,
  Check: Checkbox,
  Text: Text,
  'Long Text': Textarea,
  'Small Text': Textarea,
  Float: Float,
  Link: Link,
  Currency: Currency,
}

const val = ref(0)
const result = ref('')

const docname = ref('')

const save = () => {
  result.value = props.frm.save()
}

docname.value = "Create New " + props.frm.doctype

console.log(docname.value)
const filteredFields = computed(() => {
  const result = []
  val.value = 0 
  for (const field of props.frm.fields) {
    if (field.fieldtype === 'Section Break') {
      val.value = val.value + 1
      result.push(field)
    } else if (val.value === 0) {
      result.push(field)
    }
  }
  return result
})

const dropdownOptions = [
  {
    group: 'Actions',
    items: [
      {
        label: 'Duplicate',
        icon: () => h(FeatherIcon, { name: "copy" }),
      },
      {
        label: 'Print',
        icon: () => h(FeatherIcon, { name: "printer" }),
      },
      {
        label: "Create New " + props.frm.doctype,
        icon: () => h(FeatherIcon, { name: "file-plus" }),
      },
      {
        label: 'Delete',
        icon: () => h(FeatherIcon, { name: "trash" }),
      },
    ],
  },
]

const router = useRouter()

const goBack = () => {
  router.back()
}
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