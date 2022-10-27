function formatAddress(customer, address) {
    return {
        "first_name": customer.first_name,
        "last_name": customer.last_name,
        "address1": address.address1,
        "city": address.city,
        "postal_code": address.postal_code,
        "state_or_province": address.state_or_province,
        "country": address.country,
        "email": customer.email,
        "country_code": address.country_code
    }
}

export default formatAddress;