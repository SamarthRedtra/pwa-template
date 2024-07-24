<template>
  <div>
    <component
      v-for="field in filteredFields"
      :key="field.fieldname"
      :is="fieldMap[field.fieldtype]"
      :field="field"
      :frm="frm"
    ></component>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from 'vue'
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

}

const val = ref(0)

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
</script>
