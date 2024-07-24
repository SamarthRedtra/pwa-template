import { defineStore } from 'pinia'
import { reactive } from 'vue'
import Form from '../form/base_form.js'

export const useFormStore = defineStore('form', {
  state: () => ({
    form: reactive(new Form("Customer"))
  }),
  actions: {
    async initForm() {
      await this.form.initFields();
    },
    setForm(newForm) {
      this.form = reactive(newForm);
    }
  }
});
