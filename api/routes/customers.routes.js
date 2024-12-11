module.exports = app => {
    const customers = require("../controllers/customer.controller.js");

    var router = require("express").Router();

    router.post("/customers", customers.create);

    router.get("/customers", customers.findAll);

    router.get("/customers/:customer_id", customers.findOne);

    router.put("/customers/:customer_id", customers.update);

    router.delete("/customers/:customer_id", customers.delete);

    app.use('/api', router);
};
