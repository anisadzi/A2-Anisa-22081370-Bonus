const db = require("../models");
const Customers = db.customers;
const Op = db.Sequelize.Op;

// Create a customer
exports.create = (req, res) => {
    const customer = {
        customer_name: req.body.customer_name,
        customer_email: req.body.customer_email,
    };

    Customers.create(customer)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        });
};

// Get all customers
exports.findAll = (req, res) => {
    Customers.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Customers."
            });
        });
};

// Get one customer by id
exports.findOne = (req, res) => {
    const id = req.params.customer_id;

    Customers.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Customer with id=${id} was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Customer with id=" + id
            });
        });
};

// Update one customer by id
exports.update = (req, res) => {
    const id = req.params.customer_id;

    Customers.update(req.body, {
        where: { customer_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Customer with id=" + id
            });
        });
};

// Delete one customer by id
exports.delete = (req, res) => {
    const id = req.params.customer_id;

    Customers.destroy({
        where: { customer_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Customer was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Customer with id=${id}. Maybe Customer was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Customer with id=" + id
            });
        });
};
