import { useState } from 'react';

function NewOrder(props) {
    const { orders, setOrders } = props;
    const [order_date, setOrderDate] = useState('');
    const [customer_id, setCustomerId] = useState('');
    const [item_id, setItemId] = useState('');

    async function createOrder(e) {
        e.preventDefault();

        const response = await fetch('http://localhost/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_date,
                customer_id,
                item_id,
            }),
        });

        const data = await response.json();

        if (data.order_id) {
            setOrders([...orders, data]);
        }

        setOrderDate('');
        setCustomerId('');
        setItemId('');
    }

    return (
        <form className="new-order" onSubmit={createOrder}>
            <input type="date" placeholder="Order Date" onChange={(e) => setOrderDate(e.target.value)} value={order_date} />
            <input type="number" placeholder="Customer ID" onChange={(e) => setCustomerId(e.target.value)} value={customer_id} />
            <input type="number" placeholder="Item ID" onChange={(e) => setItemId(e.target.value)} value={item_id} />
            <button className="button green" type="submit">
                Create Order
            </button>
        </form>
    );
}

export default NewOrder;
