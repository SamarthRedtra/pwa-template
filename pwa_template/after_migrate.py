import os
import frappe
import click
from frappe.utils import update_progress_bar
from frappe.modules import import_file
from frappe.query_builder import DocType

class AfterMigrate:
	def __init__(self):
		self.sync_pwa_forms()

	def sync_pwa_forms(self):
		apps = frappe.get_installed_apps()
		for app_name in apps:
			folder_path = frappe.get_app_path(app_name, app_name,"pwa_form")
			if os.path.exists(folder_path):
				for fname in os.listdir(folder_path):
					frappe.local.flags.in_patch = True
					import_forms(os.path.join(folder_path, fname))
					frappe.local.flags.in_patch = False
					frappe.clear_cache()
				
							
def import_forms(file_path):
	try:
		docs = import_file.read_doc_from_file(file_path)
	except IOError:
		print(file_path + " missing")
		return

	calculated_hash = import_file.calculate_hash(file_path)
	if docs:
		if not isinstance(docs, list):
			docs = [docs]
		for i, doc in enumerate(docs):
			stored_hash = None
			if doc["form_name"] and doc["doctype_name"]:
				update_progress_bar(f"Updating PWA Forms for {doc['doctype_name']}", i, len(docs))
				try:
					stored_hash = frappe.db.get_value("PWA Form",{"form_name":doc["form_name"],"doctype_name":doc["doctype_name"]}, "document_hash_value")
				except Exception:
					pass
			if stored_hash and stored_hash == calculated_hash:
				continue

			#delete existing form if it exists
			if frappe.db.exists("PWA Form", {"form_name":doc["form_name"],"doctype_name":doc["doctype_name"]}):
				frappe.delete_doc("PWA Form", {"form_name":doc["form_name"],"doctype_name":doc["doctype_name"]}, force=1, for_reload=True)

			#create new form
			create_form_records(doc)

			#update hash value
			doctype_table = DocType("PWA Form")
			frappe.qb.update(doctype_table).set(doctype_table.document_hash_value, calculated_hash).where(
				(doctype_table.form_name == doc["form_name"]) & (doctype_table.doctype_name == doc["doctype_name"])
			).run()
		click.echo()
   
def create_form_records(docdict):
	docdict["__islocal"] = 1
	docdict["doctype"] = "PWA Form"
	doc = frappe.get_doc(docdict)
	doc.flags.ignore_version = True
	doc.flags.ignore_links = True
	doc.flags.ignore_validate = True
	doc.flags.ignore_permissions = True
	doc.flags.ignore_mandatory = True
	doc.insert()
