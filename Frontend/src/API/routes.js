import axios from 'axios';
const url = 'http://localhost:8080/backend-invoice-management-system'; //servlet root
const predicturl = 'http://127.0.0.1:5000'; //flask root

//fetching all invoices api
export const getInvoices = async (param) => {
    return await axios.get(`${url}/${param}`);
}

//adding data to the table api
export const addInvoice = async (invoice) => {
    return await axios.post(`${url}/add`, invoice);
}

//getting data for edit form for a specific sl_no
export const getInvoiceDataForSlNo = async (slno) => {
    return await axios.get(`${url}/edit?slno=${slno}`);
}

//editing invoice api
export const editInvoice = async (slno, invoice) => {
    return await axios.put(`${url}/edit?slno=${slno}`, invoice);
}

//deleting invoice api
export const deleteInvoiceForSlnos = async(ids) => {
    return await axios.delete(`${url}/delete?slnos=${ids}`)
}

//predict api
export const predictInvoice = async(data) => {
    return await axios.post(`${predicturl}/get_prediction`, data);
}

//adding aging_bucket value to new column api
export const addpredictedInvoice = async(slnos, agingbuckets) => {
    return await axios.get(`${url}/predict?slnos=${slnos}&agingbuckets=${agingbuckets}`)
}

//manual analytics view api
export const getAnalytics = async(cleardate_from, cleardate_to, duedate_from, duedate_to, baselinedate_from, baselinedate_to, invoicecurrency) => {
    return await axios.get(`${url}/getanalytics?cleardate_from=${cleardate_from}&cleardate_to=${cleardate_to}&duedate_from=${duedate_from}&duedate_to=${duedate_to}&baselinedate_from=${baselinedate_from}&baselinedate_to=${baselinedate_to}&invoicecurrency=${invoicecurrency}`)
}