import fetch from 'node-fetch';

const store_hash = process.env['store_hash'];
const access_token = process.env['access_token'];
const credit_account_attr_id = process.env['credit_account_attr_id'];

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Auth-Token': access_token
}

async function getCustomerCreditStatus(context, customerId) {
    const url = `https://api.bigcommerce.com/stores/${store_hash}/v3/customers/attribute-values?customer_id:in=${customerId}&attribute_id:in=${credit_account_attr_id}`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        const json = await response.json();
        return json;
    } catch(err) {
        context.log(err)
    }
}

export default getCustomerCreditStatus;