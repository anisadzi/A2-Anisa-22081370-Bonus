module.exports = app => {
    const orders = require("../controllers/order.controller.js");

    var router = require("express").Router();

    router.post("/orders", orders.create);

    router.get("/orders", orders.findAll);

    router.get("/orders/:order_id", orders.findOne);

    router.put("/orders/:order_id", orders.update);

    router.delete("/orders/:order_id", orders.delete);

    app.use('/api', router);
};
