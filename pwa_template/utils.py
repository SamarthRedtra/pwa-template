import frappe

@frappe.whitelist()
def get_form_meta(form_name, doctype_name):
	meta_data = {
		"form_name": None,
		"doctype_name": None,
		"parent_form": None,
		"is_submittable": 0,
		"is_child_table": 0,
		"form_fields": [],
	}

	if form_doc := frappe.get_doc("PWA Form", {"form_name": form_name, "doctype_name": doctype_name}):
		form_fields = []
		child_table_doctypes = set()

		for field in form_doc.pwa_form_fields:
			field_meta = {
				"idx": field.idx,
				"label": field.label,
				"fieldname": field.fieldname,
				"fieldtype": field.fieldtype,
				"reqd": field.reqd,
				"default": field.default,
				"read_only": field.read_only,
				"description": field.description,
				"options": field.options,
				"value": None,
			}

			if field.fieldtype == "Select":
				field_meta['options'] = [{'label': option, 'value': option} for option in field.options.split('\n')]
			elif field.fieldtype == "Table":
				child_table_doctypes.add(field.options)

			form_fields.append(field_meta)

		for child_table_doctype in child_table_doctypes:
			child_table_fields = []
			child_table_doc = frappe.get_doc("PWA Form", {"name": child_table_doctype})

			for c_field in child_table_doc.pwa_form_fields:
				child_field_meta = {
					"idx": c_field.idx,
					"label": c_field.label,
					"fieldname": c_field.fieldname,
					"fieldtype": c_field.fieldtype,
					"reqd": c_field.reqd,
					"default": c_field.default,
					"read_only": c_field.read_only,
					"description": c_field.description,
					"options": c_field.options,
					"value": None,
				}

				if c_field.fieldtype == "Select":
					child_field_meta['options'] = [{'label': option, 'value': option} for option in c_field.options.split('\n')]

				child_table_fields.append(child_field_meta)

			meta_data[child_table_doctype] = child_table_fields

		meta_data.update({
			"form_name": form_doc.form_name,
			"doctype_name": form_doc.doctype_name,
			"parent_form": form_doc.parent_form,
			"is_submittable": form_doc.is_submittable,
			"is_child_table": form_doc.is_child_table,
			"form_fields": form_fields,
		})

	return meta_data
