import getCheckout from '../lib/getCheckout.mjs';
import getCustomerCreditStatus from '../lib/getCustomerCreditStatus.mjs';
import getCustomer from '../lib/getCustomer.mjs';
import addCheckoutAddress from '../lib/addCheckoutAddress.mjs';
import addCheckoutConsignment from '../lib/addCheckoutConsignment.mjs';
import mapCheckoutLineItems from '../lib/mapCheckoutLineItems.mjs';
import formatAddress from '../lib/formatAddress.mjs';
import updateCheckoutConsignment from '../lib/updateCheckoutConsignment.mjs';
import createOrder from '../lib/createOrder.mjs';
import updateOrder from '../lib/updateOrder.mjs';

export default async function (context, req) {

    try {
        // Get query params
        const checkoutId = req.query.checkout;
        const purchaseOrderNumber = req.query.po;
        const storefrontUrl = process.env['storefront_url'];

        // fail if checkoutId is not available
        if (!checkoutId) {
            context.log('checkoutid is not available');

            // this could redirect to an error page or provide a query param with an error code
            // which could be used for an error message on the return page.
            context.res = {
                status: 302,
                headers: {
                    "location": storefrontUrl
                },
                body: null
            };
            return;
        }

        // get checkout
        const checkoutData = await getCheckout(context, checkoutId);
        const lineItems = mapCheckoutLineItems(checkoutData.data.cart.line_items.physical_items);

        // setup default response
        let returnUrl = storefrontUrl
        if (checkoutData.data.cart.customer_id !== 0) {
            // get customer credit account status
            // 0 = no credit
            // 1 = credit account
            // 2 = account in arrears

            const creditData = await getCustomerCreditStatus(context, checkoutData.data.cart.customer_id);
            // if the credit_account attribute value is 0 then credit.data will be an empty array
            if (creditData.data.length > 0) {
                const customerCreditIsGood = creditData.data[0].attribute_value == 1 ? true: false;
                
                if (customerCreditIsGood) {
                    // get default address for billing and shipping
                    // #TODO: this could be form post input
                    const customerData = await getCustomer(context, checkoutData.data.cart.customer_id);
                    
                    if (customerData.data.length > 0) {
                        const customer = customerData.data[0];
                        if (customer.addresses.length > 0) {
                            // update checkout with default addresses
                            const customerAddress = formatAddress(customer, customer.addresses[0]);
                            const addBillingAddress = await addCheckoutAddress(context, checkoutId, customerAddress);
                            const addConsignment = await addCheckoutConsignment(context, checkoutId, customerAddress, lineItems);
                            if (addConsignment.data.consignments.length > 0) {
                                const consignmentId = addConsignment.data.consignments[0].id;
                                // context.log(addConsignment.data.consignments[0].available_shipping_options[0].id);
                                const shippingOptionId = addConsignment.data.consignments[0].available_shipping_options[0].id;
                                // const addShipping = await updateCheckoutConsignment(context, checkoutId, consignmentId, customerAddress, lineItems, shippingOptionId);
                                const addShipping = await updateCheckoutConsignment(context, checkoutId, consignmentId, shippingOptionId);
                                // context.log(shippingOptionId);
                            }
                            const placeOrder = await createOrder(context, checkoutId);
                            const orderId = placeOrder.data.id;
                            const completeOrder = await updateOrder(context, orderId, {"status_id": 1});
                            if (completeOrder.status_id > 0) {
                                returnUrl = `${storefrontUrl}/account.php?action=view_order&order_id=${orderId}`
                            }
                        }
                    }
                }
                
            }
            context.res = {
                status: 302,
                headers: {
                    "location": returnUrl
                },
                body: null
            };
            return;
        }
        

    } catch(err) {
        context.res = {
            status: 500
        };
    }
}