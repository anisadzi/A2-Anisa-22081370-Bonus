const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* Create database tables and models */
db.items = require("./item.model.js")(sequelize, Sequelize);
db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.orders = require("./order.model.js")(sequelize, Sequelize);

db.orders.belongsTo(db.customers, { foreignKey: "customer_id", as: "customer" });
db.orders.belongsTo(db.items, { foreignKey: "item_id", as: "item" });
db.customers.hasMany(db.orders, { foreignKey: "customer_id", as: "orders" });
db.items.hasMany(db.orders, { foreignKey: "item_id", as: "orders" });

module.exports = db;