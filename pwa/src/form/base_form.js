import { reactive, ref, computed } from 'vue';
import EventEmitter from './eventemiitor';

export default class Form extends EventEmitter {
  constructor(doctype, name = null) {
    super();
    this.doctype = doctype;
    this.name = name;
    this.fields = reactive([]);
    this.dirty = false;
    this.doc = reactive({
      docstatus: 0,
      doctype: this.doctype,
    });
    this.submitable = ref(0);

    this.on('name', (value) => {
      console.log('Name changed to: ', value);
      this.dirty = true;
    });
  }

  async initFields() {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', 'token d0149bda3bda82c:aadbcbf2a847ea2');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Cookie', 'full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=');

    const raw = JSON.stringify({
      form: 'Test Form',
      doctype: this.doctype,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const currentURL = ref(window.location.href);
    const baseURL = computed(() => {
      const url = new URL(currentURL.value);
      return `${url.protocol}//${url.hostname}`;
    });

    const modifiedDocFetchURL = computed(() => `${baseURL.value}:8001/api/method/pwa_template.utils.get_form_meta`);

    try {
      const response = await fetch(modifiedDocFetchURL.value, requestOptions);
      const result = await response.json();
      this.submitable = result.message.is_submittable;
      this.fields = result.message.fields;
    } catch (error) {
      console.error('Error fetching form metadata: ', error);
    }
  }

  getValue(fieldname) {
    return this.doc[fieldname] || null;
  }

  setValue(fieldname, value) {
    this.dirty = true;
    this.doc[fieldname] = value;
    console.log(this.doc);
  }

  isNew() {
    return !!this.name;
  }

  save() {
    if (this.validateMandatory()) {
      this.dirty = false;
  
      const myHeaders = new Headers();
      myHeaders.append('Authorization', 'token d0149bda3bda82c:aadbcbf2a847ea2');
      myHeaders.append('Content-Type', 'application/json');
      const raw = JSON.stringify({
        doc: JSON.stringify(this.doc),
        action: "Save"
      });
  
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
  
      const currentURL = ref(window.location.href);
      const baseURL = computed(() => {
        const url = new URL(currentURL.value);
        return `${url.protocol}//${url.hostname}`;
      });
  
      const modifiedSaveURL = computed(() => `${baseURL.value}:8001/api/method/frappe.desk.form.save.savedocs`);
      fetch(modifiedSaveURL.value, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          return result
        })
        .catch((error) => {
          return {"Error" : error}
        });
    }
  }
  

  submit() {
    if (this.validateMandatory()) {
      this.dirty = false;
      console.log('Form submitted successfully!');
    }
  }

  delete(name){
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "token d0149bda3bda82c:aadbcbf2a847ea2");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    const raw = JSON.stringify({
      "doctype": "Customer",
      "name": name,
    });

    const currentURL = ref(window.location.href);
      const baseURL = computed(() => {
        const url = new URL(currentURL.value);
        return `${url.protocol}//${url.hostname}`;
      });
  
    const modifiedDeleteURL = computed(() => `${baseURL.value}:8001/api/method/frappe.client.delete`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(modifiedDeleteURL.value, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }
  cancel() {}

  isDirty() {
    return this.dirty;
  }

  validateMandatory() {
    for (let field of this.fields) {
      if (field.reqd && !this.doc[field.fieldname]) {
        alert(`Error: ${this.doctype} has no value in ${field.label}`);
        return false;
      }
    }
    return true;
  }
}
