import { createResource, createListResource } from "frappe-ui";
import { ref } from "vue";

export const retrieveDoc = async (name_doctype) => {
    try {
        const doc = createListResource({
            doctype: name_doctype,
            fields: ['name'],
        });
        await doc.reload();
        return {success : doc}; 
    } catch (error) {
        const errorMessage = error.messages[0]
        return { error : errorMessage}; 
    }
};
