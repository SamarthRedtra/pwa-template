import { reactive, ref, computed } from 'vue';
import EventEmitter from './eventemiitor';
import { createListResource, createResource, createDocumentResource } from 'frappe-ui';

export default class Form extends EventEmitter {
  constructor(doctype, name = null) {
    super();
    this.doctype = doctype;
    this.name = name;
    this.fields = reactive([]);
    this.dirty = false;
    this.doc = reactive({
      docstatus: 0, 
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
      console.log(result)
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
      const savedoc = createListResource({
        doctype: this.doctype,
      });
  
      return savedoc.insert.submit(this.doc)
        .then(response => {
          return 'Document saved successfully';
        })
        .catch(error => {
          console.log(error);
          throw new Error('Error saving document');
        });
    } else {
      return Promise.reject(new Error('Validation failed'));
    }
  }
  
  submit(name) {
    if (this.validateMandatory()) {
      this.dirty = false;
      const submitdoc = createListResource(
        {
          doctype: this.doctype,
          filters: {
            name: name,
          }
        }
      )

      submitdoc.setValue.submit({
        docstatus: 1
      })
      console.log(submitdoc)
      // console.log('Form submitted successfully!');
    }
  }

  delete(name){
    const val = ref('')
    const deletedoc = createDocumentResource(
      {
        doctype: this.doctype,
        name: name,   
      }
    )
    return deletedoc.delete.submit()
    .then(response => {
      val.value = 'Document Deleted successfully';
      return val.value; 
    })
    .catch(error => {
      console.error(error);
      val.value = 'Error deleting document';
      return val.value;
    });
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
