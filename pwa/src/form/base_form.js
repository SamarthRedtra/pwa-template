import { reactive } from 'vue'
import EventEmitter from "./eventemiitor"

export default class Form extends EventEmitter {
  constructor(doctype, name = null) {
    super();
    this.doctype = doctype;
    this.name = name;
    this.fields = reactive([]);
    this.dirty = false;
    this.doc = reactive({});
    this.on("name", (value) => {
      console.log("Name changed to: ", value);
      this.dirty = true;
    });
  }

  async initFields() {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "token d0149bda3bda82c:aadbcbf2a847ea2");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "full_name=Guest; sid=Guest; system_user=no; user_id=Guest; user_image=");

    const raw = JSON.stringify({
      "form": "Test Form",
      "doctype": this.doctype
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("http://192.168.1.20:8001/api/method/pwa_template.utils.get_form_meta", requestOptions);
      const result = await response.json();
      this.fields = result.message.fields;
      console.log("Fields initialized: ", this.fields);
    } catch (error) {
      console.error("Error fetching form metadata: ", error);
    }
  }

  getValue(fieldname) {
    return this.doc[fieldname] || null;
  }

  setValue(fieldname, value) {
    this.dirty = true;
    this.doc[fieldname] = value;
    console.log(this.doc)
  }
  
  isNew() {
    return !!this.name;
  }

  save() {
    if (this.validateMandatory()) {
      this.dirty = false;
      console.log("Form saved successfully!");
    }
  }

  submit() {
    if (this.validateMandatory()) {
      this.dirty = false;
      console.log("Form submitted successfully!");
    }
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
