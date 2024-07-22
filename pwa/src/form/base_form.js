import EventEmitter from "./eventemiitor"

export default class Form extends EventEmitter{
  constructor(doctype, name = null) {
	super()
    this.doctype = doctype
    this.name = name
    this.fields = [
      {
        fieldname: 'heading',
        label: 'This is a heading',
        fieldtype: 'Heading',
      },
      {
        fieldname: 'name',
        label: 'Name',
        fieldtype: 'Data',
        options: '',
        default: '',
        reqd: true,
        read_only: false,
      },
      {
        fieldname: 'Number',
        label: 'number',
        fieldtype: 'Int',
        options: '',
        default: '',
        reqd: true,
        read_only: false,
        value:'Ravi',
      },
      {
        fieldname: 'gender',
        label: 'Gender',
        fieldtype: 'Select',
        options: [
          {
            label: 'Male',
            value: 'Male',
          },
          {
            label: 'Female',
            value: 'Female',
          },
          {
            label: 'Others',
            value: 'Others',
          },
        ],
        default: '',
        reqd: true,
        read_only: false,
      },
      {
        fieldname: 'gender',
        label: 'Gender',
        fieldtype: 'Autocomplete',
        options: [
          {
            label: 'Male',
            value: 'Male',
          },
          {
            label: 'Female',
            value: 'Female',
          },
          {
            label: 'Others',
            value: 'Others',
          },
        ],
        default: '',
        reqd: true,
        read_only: false,
      },
    ]
    this.dirty = false
    this.doc = {}
	this.on("name", (value) => {
		console.log("Name changed to: ", value);
        this.dirty = true;
	})

  }
  getValue(fieldname) {
    if (this.doc.fieldname) {
      console.log(this.doc)
    } else {
      console.log(`Field ${fieldname} does not exist.`);
      return null;
    }
  }
  setValue(fieldname, value) {
    this.dirty = true;
    this.doc[fieldname] = value;
    console.log(this.doc)
  }
  isNew() {
    return !!this.name;
  }

  save(){
    if (this.validate_mandatory()) {
      this.dirty = false;
      console.log("Form saved successfully!");
    }
  }
  submit(){
    if (this.validate_mandatory()) {
      this.dirty = false;
      console.log("Form submitted successfully!");
    }
  }
  cancel(){}
  isDirty(){
    return this.dirty; 
  }
  validate_mandatory() {
    for (let field of this.fields) {
      if (field.reqd && !this.doc[field.fieldname]) {
        alert(`Error: ${this.doctype} has no value in ${field.label}`);
        return false;
      }
    }
    return true;
  }

}
