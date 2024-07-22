import { defineStore } from 'pinia'
import Form from '../form/base_form.js'

export const useFormStore = defineStore('form', {
  state: () => ({
    form: new Form("Test Form")
  }),
  actions: {
    setForm(newForm) {
      this.form = newForm;
    }
  }
})
