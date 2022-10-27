function mapCheckoutLineItems(physicalItems) {
    const lineItems = physicalItems.map((item) => {
        return {
            "item_id": item.id,
            "quantity": item.quantity
        };
    });
    return lineItems;
}

export default mapCheckoutLineItems