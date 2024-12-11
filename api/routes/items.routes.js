module.exports = app => {
    const items = require("../controllers/item.controller.js");

    var router = require("express").Router();

    router.post("/items", items.create);

    router.get("/items", items.findAll);

    router.get("/items/:item_id", items.findOne);

    router.put("/items/:item_id", items.update);

    router.delete("/items/:item_id", items.delete);

    app.use('/api', router);
};
