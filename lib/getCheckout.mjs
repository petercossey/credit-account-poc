import fetch from 'node-fetch';

const store_hash = process.env['store_hash']
const access_token = process.env['access_token']

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Auth-Token': access_token
}

async function getCheckout(context, checkoutId) {
    const url = `https://api.bigcommerce.com/stores/${store_hash}/v3/checkouts/${checkoutId}`;
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

export default getCheckout;