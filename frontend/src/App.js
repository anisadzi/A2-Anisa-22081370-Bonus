import { useState, useEffect } from 'react';
import CustomerList from './components/CustomerList.js';
import OrderList from './components/OrderList.js';
import ItemList from './components/ItemList.js';
import './App.css';


function App() {
    const [customers, setCustomers ] = useState([]);
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost/api/customers/`)
            .then((response) => response.json())
            .then((data) => setCustomers(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost/api/items/`)
            .then((response) => response.json())
            .then((data) => setItems(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch(`http://localhost/api/orders/`)
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div className='page'>
            <h1>Order Management System</h1>
            <CustomerList customers={customers} setCustomers={setCustomers} />

            <ItemList items={items} setItems={setItems} />

            <OrderList orders={orders} setOrders={setOrders} />

        </div>
    );
}

export default App;
