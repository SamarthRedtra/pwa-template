export default class Form {
  constructor(doctype, name = null) {
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
