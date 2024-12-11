import { useState } from 'react';

function Customer(props) {
    const { customer, customers, setCustomers } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedCustomerName, setEditedCustomerName] = useState(customer.customer_name);
    const [editedCustomerEmail, setEditedCustomerEmail] = useState(customer.customer_email);

    // Handle delete operation
    async function deleteCustomer() {
        await fetch(`http://localhost/api/customers/${customer.customer_id}`, {
            method: 'DELETE',
        });

        const newCustomers = customers.filter((p) => p.customer_id !== customer.customer_id);
        setCustomers(newCustomers);
    }

    // Handle update operation
    async function updateCustomer() {
        const response = await fetch(`http://localhost/api/customers/${customer.customer_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_name: editedCustomerName,
                customer_email: editedCustomerEmail,
            }),
        });

        if (response.ok) {
            const updatedCustomer = await response.json();
            const newCustomers = customers.map((c) =>
                c.customer_id === updatedCustomer.customer_id ? updatedCustomer : c
            );
            setCustomers(newCustomers);
            setIsEditing(false);
        } else {
            alert('Failed to update customer.');
        }
    }

    return (
        <tr>
            {isEditing ? (
                <>
                    <td>{customer.customer_id}</td>
                    <td>
                        <input
                            type="text"
                            value={editedCustomerName}
                            onChange={(e) => setEditedCustomerName(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="text"
                            value={editedCustomerEmail}
                            onChange={(e) => setEditedCustomerEmail(e.target.value)}
                        />
                    </td>
                    <td>
                        <button className="button green" onClick={updateCustomer}>
                            Save
                        </button>
                        <button className="button red" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{customer.customer_id}</td>
                    <td>{customer.customer_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>
                        <button className="button green" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button className="button red" onClick={deleteCustomer}>
                            Delete
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Customer;
