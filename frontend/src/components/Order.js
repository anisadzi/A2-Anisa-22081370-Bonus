import { useState } from 'react';

function Order(props) {
    const { order, orders, setOrders } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [editedOrderDate, setEditedOrderDate] = useState(order.order_date);
    const [editedCustomerId, setEditedCustomerId] = useState(order.customer_id);
    const [editedItemId, setEditedItemId] = useState(order.item_id);

    // Handle delete operation
    async function deleteOrder() {
        await fetch(`http://localhost/api/orders/${order.order_id}`, {
            method: 'DELETE',
        });

        const newOrders = orders.filter((o) => o.order_id !== order.order_id);
        setOrders(newOrders);
    }

    // Handle update operation
    async function updateOrder() {
        const response = await fetch(`http://localhost/api/orders/${order.order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_date: editedOrderDate,
                customer_id: editedCustomerId,
                item_id: editedItemId,
            }),
        });

        if (response.ok) {
            const updatedOrder = await response.json();
            const newOrders = orders.map((o) =>
                o.order_id === updatedOrder.order_id ? updatedOrder : o
            );
            setOrders(newOrders);
            setIsEditing(false);
        } else {
            alert('Failed to update order.');
        }
    }

    return (
        <tr>
            {isEditing ? (
                <>
                    <td>{order.order_id}</td>
                    <td>
                        <input
                            type="date"
                            value={editedOrderDate}
                            onChange={(e) => setEditedOrderDate(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={editedCustomerId}
                            onChange={(e) => setEditedCustomerId(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            type="number"
                            value={editedItemId}
                            onChange={(e) => setEditedItemId(e.target.value)}
                        />
                    </td>
                    <td>
                        <button className="button green" onClick={updateOrder}>
                            Save
                        </button>
                        <button className="button red" onClick={() => setIsEditing(false)}>
                            Cancel
                        </button>
                    </td>
                </>
            ) : (
                <>
                    <td>{order.order_id}</td>
                    <td>{order.order_date}</td>
                    <td>{order.customer_id}</td>
                    <td>{order.item_id}</td>
                    <td>
                        <button className="button green" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                        <button className="button red" onClick={deleteOrder}>
                            Delete
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
}

export default Order;
