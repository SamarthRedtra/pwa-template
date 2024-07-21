import EventEmitter from "./eventemiitor"

export default class Form extends EventEmitter{
  constructor(doctype, name = null) {
	super()
    this.doctype = doctype
    this.name = name
    this.fields = [
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
    ]
    this.dirty = false

	this.on("name", (value) => {
		console.log("Name changed to: ", value);
        this.dirty = true;
	})

  }
  getValue(fieldname){}
  setValue(fieldname, value){}
  isNew(){}
  save(){}
  submit(){}
  cancel(){}
  isDirty(){}
  validate_mandatory(){}
  validate_unique(){}

}
