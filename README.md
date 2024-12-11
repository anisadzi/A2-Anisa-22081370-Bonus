# Database
This new aplication task has three tables following the example configuration from the instruction file.

## Model

### `customer.model.js`
This file defines the **Customer** model, which represents the customer entity in the database. The model contains the following fields:

- **customer_id**: A unique identifier for each customer, set as an auto-incrementing primary key.
- **customer_name**: The name of the customer, stored as a string.
- **customer_email**: The email address of the customer, stored as a string.

This model is used to interact with the `customers` table in the database, providing methods to create, read, update, and delete customer records.

---

### `item.model.js`
This file defines the **Item** model, representing items in the store or inventory. The model consists of the following fields:

- **item_id**: A unique identifier for each item, set as an auto-incrementing primary key.
- **item_name**: The name of the item, stored as a string.
- **item_price**: The price of the item, stored as a string (this can be updated to a numerical type like `DECIMAL` if required for price calculations).

This model is used to interact with the `items` table in the database for managing item records.

---

### `order.model.js`
The **Order** model represents orders placed by customers for items. This model contains the following fields:

- **order_id**: A unique identifier for each order, set as an auto-incrementing primary key.
- **order_date**: The date the order was placed, defaulted to the current date and time using `Sequelize.NOW`.
- **customer_id**: A foreign key that links the order to a customer, referencing the `customer_id` field in the `customers` table.
- **item_id**: A foreign key that links the order to an item, referencing the `item_id` field in the `items` table.

Additionally, this model includes an **association function**:
- The `Order` belongs to both `Customer` and `Item` (via `customer_id` and `item_id`). This means that each order is related to a specific customer and a specific item.

---

### `index.js`
This file is the entry point for setting up and connecting the database using Sequelize. It contains the following components:

- **dbConfig**: Imports database configuration from an external `db.config.js` file.
- **Sequelize Initialization**: Establishes a connection to the database using the Sequelize ORM, based on the configuration in `dbConfig`.
- **Model Initialization**: Initializes the `items`, `customers`, and `orders` models and associates them with the database connection (`sequelize`).
- **Association Definitions**: Defines the relationships between models:
  - An `Order` belongs to both `Customer` and `Item` (using the foreign keys `customer_id` and `item_id`).
  - A `Customer` can have many `Orders`, and an `Item` can be part of many `Orders`.

The `db` object is populated with the models and exported, making them accessible throughout the rest of the application.

--- 

## Controller

### `customer.controller.js`
The `customer.controller.js` file handles operations related to `Customers`. The available functions are:

- **Create a customer**  
  `POST /customers`
  - Creates a new customer with the given `customer_name` and `customer_email`.

- **Get all customers**  
  `GET /customers`
  - Retrieves a list of all customers.

- **Get a customer by ID**  
  `GET /customers/:customer_id`
  - Retrieves a customer by their ID. If not found, returns a 404 error.

- **Update a customer by ID**  
  `PUT /customers/:customer_id`
  - Updates a customer's information based on the provided ID.

- **Delete a customer by ID**  
  `DELETE /customers/:customer_id`
  - Deletes a customer by their ID.

---

### `item.controller.js`
The `item.controller.js` file handles operations related to `Items`. The available functions are:

- **Create an item**  
  `POST /items`
  - Creates a new item with the provided `item_name` and `item_price`.

- **Get all items**  
  `GET /items`
  - Retrieves a list of all items.

- **Get an item by ID**  
  `GET /items/:item_id`
  - Retrieves an item by its ID. If not found, returns a 404 error.

- **Update an item by ID**  
  `PUT /items/:item_id`
  - Updates an item's information based on the provided ID.

- **Delete an item by ID**  
  `DELETE /items/:item_id`
  - Deletes an item by its ID.

---

### `order.controller.js`
The `order.controller.js` file handles operations related to `Orders`. The available functions are:

- **Create an order**  
  `POST /orders`
  - Creates a new order with the provided `order_date`, `customer_id`, and `item_id`.

- **Get all orders**  
  `GET /orders`
  - Retrieves a list of all orders, including associated `Customer` and `Item` details.

- **Get an order by ID**  
  `GET /orders/:order_id`
  - Retrieves an order by its ID, including associated `Customer` and `Item` details. If not found, returns a 404 error.

- **Update an order by ID**  
  `PUT /orders/:order_id`
  - Updates an order's information based on the provided ID.

- **Delete an order by ID**  
  `DELETE /orders/:order_id`
  - Deletes an order by its ID.

---

## Routes

### `customers.routes.js`
This file defines the routes for the **Customer** model. It includes the following endpoints:

- **POST /api/customers**: Creates a new customer.
- **GET /api/customers**: Retrieves all customers.
- **GET /api/customers/:customer_id**: Retrieves a customer by their ID.
- **PUT /api/customers/:customer_id**: Updates an existing customer by their ID.
- **DELETE /api/customers/:customer_id**: Deletes a customer by their ID.

These routes interact with the `customer.controller.js` file to perform operations on the `customers` model.

---

### `items.routes.js`
This file defines the routes for the **Item** model. It includes the following endpoints:

- **POST /api/items**: Creates a new item.
- **GET /api/items**: Retrieves all items.
- **GET /api/items/:item_id**: Retrieves an item by its ID.
- **PUT /api/items/:item_id**: Updates an existing item by its ID.
- **DELETE /api/items/:item_id**: Deletes an item by its ID.

These routes interact with the `item.controller.js` file to perform operations on the `items` model.

---

### `orders.routes.js`
This file defines the routes for the **Order** model. It includes the following endpoints:

- **POST /api/orders**: Creates a new order.
- **GET /api/orders**: Retrieves all orders.
- **GET /api/orders/:order_id**: Retrieves an order by its ID.
- **PUT /api/orders/:order_id**: Updates an existing order by its ID.
- **DELETE /api/orders/:order_id**: Deletes an order by its ID.

These routes interact with the `order.controller.js` file to perform operations on the `orders` model.

---

# APIs

## Executing API

### Customer API
1. Add customer (POST)

![post customer](https://github.com/user-attachments/assets/d4bed3b3-93d2-4ae4-ad83-d014aa036e4d)


2. Get all customer (GET)

![get all customer](https://github.com/user-attachments/assets/a694ff03-7b0c-462a-9ee3-2d0cb6943e53)


3. Get customer by ID (GET)

![get customer by id](https://github.com/user-attachments/assets/cae52bea-4208-42a2-a5c4-40bbbb966e23)


4. Edit customer (PUT)

![update customer](https://github.com/user-attachments/assets/6ff87aa3-aa8f-4955-808c-757832e41240)


5. Delete customer (DELETE)

![delete customer](https://github.com/user-attachments/assets/fd1666ff-8c37-4cf0-9030-92aedc573f68)

![delete customer 2](https://github.com/user-attachments/assets/17ca6739-8d75-4851-82aa-b710cd031bbf)

---

### Item API
1. Add item (POST)

![post item](https://github.com/user-attachments/assets/c202b2c2-3c0a-4f46-9f94-047d5de1a8c1)


2. Get all item (GET)

![get all items](https://github.com/user-attachments/assets/02a602c0-f282-486a-bab1-e7a33c54dcc6)


3. Get item by ID (GET)

![get items by id](https://github.com/user-attachments/assets/df835aea-29cf-404b-bc77-4c1660860d35)


4. Edit item (PUT)

![edit item](https://github.com/user-attachments/assets/031d74a8-44b6-45b8-a51a-9e34dabc7040)


5. Delete item (DELETE)

![delete item 1](https://github.com/user-attachments/assets/2029870e-911e-4292-919f-046c90b2aacf)

![delete item 2](https://github.com/user-attachments/assets/c12fb1a7-5473-4cf6-a9b9-c9d3e06e2568)

---

### Order API
1. Add order (POST)

![post order](https://github.com/user-attachments/assets/c5ff3b25-0543-4ef5-9e98-ddd167a49e4b)


2. Get all order (GET)

![get all order](https://github.com/user-attachments/assets/4cfdd638-df88-4577-af8c-44084188d5a5)


3. Get order by ID (GET)

![get order by id](https://github.com/user-attachments/assets/07abed92-fe5a-4616-ba4d-4fda82670ffe)


4. Edit order (PUT)

![edit order 1](https://github.com/user-attachments/assets/60da0db6-e8fb-4c09-afe0-e3c9eda9ca36)

![edit order 2](https://github.com/user-attachments/assets/4214b03b-bd1f-4eeb-a096-ceb1f6c67548)


5. Delete order (DELETE)

![delete order](https://github.com/user-attachments/assets/2df2b601-f0bd-48e2-bc7d-f10031f0cc5b)

---

# FrontEnd

## Customer
These files define React components for managing customers, including functionality for displaying, editing, creating, and deleting customer records.

### `Customer.js`
The `Customer.js` component handles displaying and editing individual customer records. It includes functionality for:

- **Editing a customer**: When editing, the customer’s name and email can be modified. Changes are saved via an API PUT request.
- **Deleting a customer**: The customer can be deleted, which removes them from both the database (via a DELETE request) and the UI.
- **Conditional rendering**: The component renders either the editable fields (when `isEditing` is true) or customer details (when `isEditing` is false).

Features:
- Edit customer name and email.
- Delete customer from the list.
- Save changes or cancel editing.

---

### `CustomerList.js`
The `CustomerList.js` component displays a list of customers and provides an interface for creating new customers. It includes:

- **Displaying customer records**: Each customer is rendered using the `Customer` component.
- **Creating new customer**: A `NewCustomer` component is included to add new customers to the list.

Features:
- List all customers with customer ID, name, and email.
- Add a new customer using the `NewCustomer` component.
- Edit or delete customers.

---

### `NewCustomer.js`
The `NewCustomer.js` component handles adding a new customer. It includes:

- **Input fields**: Allows the user to input a customer's name and email.
- **Creating new customer**: When the form is submitted, a POST request is made to the backend API to create the new customer, and the customer list is updated.
  
Features:
- Input fields for customer name and email.
- Submit the form to create a new customer and update the list.

---

## Item
These files define React components for managing items, including functionality for displaying, editing, creating, and deleting item records.

### `Item.js`
The `Item.js` component handles displaying and editing individual Item records. It includes functionality for:

- **Editing an item**: When editing, the item’s name and price can be modified. Changes are saved via an API PUT request.
- **Deleting an item**: The item can be deleted, which removes them from both the database (via a DELETE request) and the UI.
- **Conditional rendering**: The component renders either the editable fields (when `isEditing` is true) or item details (when `isEditing` is false).

Features:
- Edit item name and price.
- Delete item from the list.
- Save changes or cancel editing.

---

### `ItemList.js`
The `ItemList.js` component displays a list of items and provides an interface for creating new items. It includes:

- **Displaying item records**: Each item is rendered using the `Item` component.
- **Creating new items**: A `NewItem` component is included to add new items to the list.

Features:
- List all items with item ID, name, and price.
- Add a new item using the `NewItem` component.
- Edit or delete items.

---

### `NewItem.js`
The `NewItem.js` component handles adding a new item. It includes:

- **Input fields**: Allows the user to input a item's name and price.
- **Creating a new item**: When the form is submitted, a POST request is made to the backend API to create the new item, and the item list is updated.
  
Features:
- Input fields for item name and price.
- Submit the form to create a new item and update the list.

---

## Order
These files define React components for managing orders, including functionality for displaying, editing, creating, and deleting order records.

### `Order.js`
The `Order.js` component handles displaying and editing individual order records. It includes functionality for:

- **Editing an order**: When editing, the order’s date, customer ID, and item ID can be modified. Changes are saved via an API PUT request.
- **Deleting an order**: The order can be deleted, which removes it from both the database (via a DELETE request) and the UI.
- **Conditional rendering**: The component renders either the editable fields (when `isEditing` is true) or order details (when `isEditing` is false).

Features:
- Edit order date, customer ID, and item ID.
- Delete order from the list.
- Save changes or cancel editing.

---

### `OrderList.js`
The `OrderList.js` component displays a list of orders and provides an interface for creating new orders. It includes:

- **Displaying order records**: Each order is rendered using the `Order` component.
- **Creating new orders**: A `NewOrder` component is included to add new orders to the list.

Features:
- List all orders with order ID, date, customer ID, and item ID.
- Add a new order using the `NewOrder` component.
- Edit or delete orders.

---

### `NewOrder.js`
The `NewOrder.js` component provides a form for creating new orders. It includes functionality for:

- **Creating an order**: When the form is submitted, a POST request is made to add a new order to the database.
- **Clearing the form**: After an order is successfully created, the form fields are reset.
  
Features:
- Input fields for order date, customer ID, and item ID.
- Submit button to create a new order.

---

# Capture

### Customer Capture
![customer capture](https://github.com/user-attachments/assets/0e326627-6f63-4a50-91c0-f9b509227961)

![customer edit](https://github.com/user-attachments/assets/3a664b29-3b9c-4fb7-967f-a36f041b4264)

- Input fields: Input fields labeled "Customer Name" and "Customer Email" for adding/creating new customers name and email.
- Add Customer Button: A green button labeled "Add Customer" allows the user to add a new customer to the system.
- Customer Table: The table lists several customers with the following columns:
   - Customer ID: A unique identifier for each customer.
   - Customer Name: The name of the customer.
   - Customer Email: The email address of the customer.
- Edit/Delete Buttons: Next to each customer's information, there are two buttons for each customer:
   - Edit (Green): Allows the user to edit customer details.
   - Delete (Red): Allows the user to delete a customer record from the system.
- Save Button: Allow the user to save the changes on customer name and/or customer email
- Cancel Button: Allow the user to cancel the changes on customer name and/or customer email

---

### Item Capture
![item capture](https://github.com/user-attachments/assets/96814c57-98d0-4bfb-96d1-9c6347e64c0c)

![item edit](https://github.com/user-attachments/assets/9b00fb76-9546-458f-b582-57c154b6cea0)

- Input fields: Input fields labeled "Item Name" and "Item Price" for adding/creating new item name and price.
- Add Item Button: A green button labeled "Add Item" allows the user to add a new item to the system.
- Item Table: The table lists several items with the following columns:
   - Item ID: A unique identifier for each item.
   - Item Name: The name of the item.
   - Item Price: The price of the item.
- Edit/Delete Buttons: Next to each item's detail, there are two buttons for each item:
   - Edit (Green): Allows the user to edit item details.
   - Delete (Red): Allows the user to delete an item record from the system.
- Save Button: Allow the user to save the changes on item name and/or item price
- Cancel Button: Allow the user to cancel the changes on item name and/or item price

