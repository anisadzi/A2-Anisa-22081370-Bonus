import Order from './Order.js';
import NewOrder from './NewOrder.js';

function OrderList(props) {
    const { orders, setOrders } = props;

    return (
        <div className="order-list">
            <h2>Orders</h2>

            <NewOrder orders={orders} setOrders={setOrders} />

            <hr />
            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Customer ID</th>
                        <th>Item ID</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <Order key={order.order_id} order={order} orders={orders} setOrders={setOrders} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default OrderList;
