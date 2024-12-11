import Customer from './Customer.js';
import NewCustomer from './NewCustomer.js';

function CustomerList(props) {
    const { customer, customers, setCustomers } = props;

    return (
        <div className="customer-list">
            <h2>Customers</h2>

            <NewCustomer customers={customers} setCustomers={setCustomers} customer={customer} />

            <hr />
            <table onClick={(e) => e.stopPropagation()}>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((customer) => {
                            return (
                                <Customer key={customer.customer_id} customer={customer} customers={customers} setCustomers={setCustomers} />
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
	);
}

export default CustomerList;
