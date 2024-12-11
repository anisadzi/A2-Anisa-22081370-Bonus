import { useState } from 'react';

function NewCustomer(props) {
    const { customers, setCustomers } = props;
    const [customer_name, setName] = useState('');
    const [customer_email, setEmail] = useState('');

    async function createCustomer(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_name,
                customer_email,
            }),
        });

        const data = await response.json();

        if (data.customer_id) {
            setCustomers([...customers, data]);
        }

        setName('');
        setEmail('');
    }

    return (
        <form className="new-customer" onSubmit={createCustomer}>
            <input type="text" placeholder="Customer Name" onChange={(e) => setName(e.target.value)} value={customer_name} />
            <input type="text" placeholder="Customer Email" onChange={(e) => setEmail(e.target.value)} value={customer_email} />
            <button className="button green" type="submit">
                Add Customer
            </button>
        </form>
    );
}

export default NewCustomer;
