const db = require("../models");
const Orders = db.orders;
const Customers = db.customers;
const Items = db.items;
const Op = db.Sequelize.Op;

// Create an order
exports.create = (req, res) => {
    const order = {
        order_date: req.body.order_date || new Date(),
        customer_id: req.body.customer_id,
        item_id: req.body.item_id,
    };

    Orders.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Order."
            });
        });
};

// Get all orders
exports.findAll = (req, res) => {
    Orders.findAll({
        include: [
            {
                model: Customers,
                as: 'customer',
                attributes: ['customer_id', 'customer_name', 'customer_email']
            },
            {
                model: Items,
                as: 'item',
                attributes: ['item_id', 'item_name', 'item_price']
            }
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Orders."
            });
        });
};

// Get one order by id
exports.findOne = (req, res) => {
    const id = req.params.order_id;

    Orders.findByPk(id, {
        include: [
            {
                model: Customers,
                as: 'customer',
                attributes: ['customer_id', 'customer_name', 'customer_email']
            },
            {
                model: Items,
                as: 'item',
                attributes: ['item_id', 'item_name', 'item_price']
            }
        ]
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Order with id=${id} was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id
            });
        });
};

// Update one order by id
exports.update = (req, res) => {
    const id = req.params.order_id;

    Orders.update(req.body, {
        where: { order_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id
            });
        });
};

// Delete one order by id
exports.delete = (req, res) => {
    const id = req.params.order_id;

    Orders.destroy({
        where: { order_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });
};
