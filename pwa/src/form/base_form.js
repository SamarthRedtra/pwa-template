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
    this.Docstatus = ref(0);
    this.Saved = ref(0);
    this.Submit = ref(0);
    
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
      form: 'Test_Form',
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
  
    if (this.name != null) {
      const docValues = createListResource(
        {
          doctype: this.doctype,
          fields: ['*'],
          filters: {
            name: this.name
          },
        }
      )
      await docValues.reload();
  
      const fetchedData = docValues.data[0];
      if(docValues.data[0].docstatus == 0){
        this.Docstatus = docValues.data[0].docstatus;
        this.Saved = 1
      }
      else if(docValues.data[0].docstatus == 1){
        this.Docstatus = docValues.data[0].docstatus;
        this.Submit = 1;
        this.Saved = 1;
      }
      Object.keys(fetchedData).forEach(key => {
        this.doc[key] = fetchedData[key];
      });
      this.updateFields();
    }
  }
  


  updateFields() {
    this.fields.forEach(field => {
      if (this.doc.hasOwnProperty(field.fieldname)) {
        field.value = this.doc[field.fieldname];
      }
    });
  }
  
  getValue(fieldname) {
    return this.doc[fieldname] || null;
  }

  setValue(fieldname, value) {
    this.dirty = true;
    this.doc[fieldname] = value;
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
          Object.assign(this.doc, response);
          this.Saved = 1;
          this.updateFields();
          this.name = this.doc.name;
          this.Docstatus = 0;
          return response.name;
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
      const submitdoc = createListResource({
        doctype: this.doctype,
        filters: {
          name: name,
        }
      });
  
      return submitdoc.reload()
        .then(() => submitdoc.setValue.submit({
          name: name,
          docstatus:1,
        }))
        .then(response => {
          this.Docstatus = 1;
          this.Submit = 1;
          return response.docstatus;
        })
        .catch(error => {
          console.log(error);
          throw new Error('Error submitting document');
        });
    } else {
      return Promise.reject(new Error('Validation failed'));
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
