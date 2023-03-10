const mongoose = require("mongoose");
const User = require ("./user.model");

const db = {};

db.mongoose = mongoose;
db.user = User;

module.exports = db;