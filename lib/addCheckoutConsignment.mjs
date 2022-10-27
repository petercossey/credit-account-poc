import fetch from 'node-fetch';

const store_hash = process.env['store_hash']
const access_token = process.env['access_token']

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Auth-Token': access_token
}

async function addCheckoutConsignment(context, checkoutId, address, lineItems) {
    const url = `https://api.bigcommerce.com/stores/${store_hash}/v3/checkouts/${checkoutId}/consignments?include=consignments.available_shipping_options`;
    const consignment = [{
        "address": address,
        "line_items": lineItems
    }];
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(consignment)
        });
        const json = await response.json();
        return json;
    } catch(err) {
        context.log(err)
    }
}

export default addCheckoutConsignment;