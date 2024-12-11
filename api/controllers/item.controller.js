const db = require("../models");
const Items = db.items;
const Op = db.Sequelize.Op;

// Create an item
exports.create = (req, res) => {
    const item = {
        item_name: req.body.item_name,
        item_price: req.body.item_price,
    };

    Items.create(item)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Item."
            });
        });
};

// Get all items
exports.findAll = (req, res) => {
    Items.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Items."
            });
        });
};

// Get one item by id
exports.findOne = (req, res) => {
    const id = req.params.item_id;

    Items.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Item with id=${id} was not found.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Item with id=" + id
            });
        });
};

// Update one item by id
exports.update = (req, res) => {
    const id = req.params.item_id;

    Items.update(req.body, {
        where: { item_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Item with id=${id}. Maybe Item was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + id
            });
        });
};

// Delete one item by id
exports.delete = (req, res) => {
    const id = req.params.item_id;

    Items.destroy({
        where: { item_id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Item was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Item with id=${id}. Maybe Item was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Item with id=" + id
            });
        });
};
