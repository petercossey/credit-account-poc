import fetch from 'node-fetch';

const store_hash = process.env['store_hash']
const access_token = process.env['access_token']

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Auth-Token': access_token
}

async function updateOrder(context, orderId, data) {
    const url = `https://api.bigcommerce.com/stores/${store_hash}/v2/orders/${orderId}`;
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });
        const json = await response.json();
        return json;
    } catch(err) {
        context.log(err)
    }
}

export default updateOrder;