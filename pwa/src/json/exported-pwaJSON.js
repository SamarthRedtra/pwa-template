import { createResource } from "frappe-ui";
import formFields from '../../../pwa_template/pwa_template/pwa_form/test_form.json'

export const exportedData = async (docName) => {
    // console.log(formFields)
    const jsons = createResource({
        url: 'pwa_template.utils.get_form_meta',
        method: 'POST',
    });

    await jsons.fetch()
        return docName ? jsons.data[docName] : jsons.data
};