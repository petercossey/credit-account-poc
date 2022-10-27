# Credit Account POC

This middleware POC provides an endpoint that accepts a GET request with a search parameter for a cart/checkout ID which connects to a BigCommerce store and uses customer data (via customer attribute values) to determine if the customer can place an order using credit.

The middleware offers the ability for a BigCommerce Stencil storefront to generate a link to allow for the relevant customers to place orders using credit accounts without needing to use the default checkout, e.g.

> `https://this-serverless-function.app/api/CreateOrder?checkout=foob9f09-6499-4556-9476-02078a75d52e`

The middleware redirects the client back to the storefront URL after processing the cart/checkout.

## Environment variables

The middleware relies on the following environment variable:

- `store_hash`: the short key to identify the BigCommerce store
- `access_token`: API account credentials with relevant scopes for reading/writing checkout, customer + order data
- `storefront_url`: the URL of the storefront to return the client/browser to.
- `credit_account_attr_id`: the ID which identifies the relevant customer attribute which is used to store the customer credit status

## Code Samples Disclaimer

This repository may include code samples for demonstration and illustration purposes. I provide these samples without guarantee or warranty. It is the responsibility of Client, or an agency contracted by Client, to ensure any custom code functions as expected.

## Sanity Check

This proof-of-concept is just a sketch and shouldn't be considered even close to production code - there's a lot of error checking and some basic security on the exposed endpoint that is missing from this implementation.

## How do I run it?

This has been developed using the Azure Function App ecosystem: checkout [Quickstart: Create a JavaScript function in Azure using Visual Studio Code](https://learn.microsoft.com/en-us/azure/azure-functions/create-first-function-vs-code-node).

It's possible to develop and run it locally even without an Azure deployment/instance.