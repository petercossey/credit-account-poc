import fetch from 'node-fetch';

const store_hash = process.env['store_hash']
const access_token = process.env['access_token']

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Auth-Token': access_token
}

async function updateCheckoutConsignment(context, checkoutId, consignmentId, shippingOptionId) {
    const url = `https://api.bigcommerce.com/stores/${store_hash}/v3/checkouts/${checkoutId}/consignments/${consignmentId}`;
    const consignment = {
        "shipping_option_id": shippingOptionId
    };
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(consignment)
        });
        const json = await response.json();
        return json;
    } catch(err) {
        context.log(err)
    }
}

export default updateCheckoutConsignment;