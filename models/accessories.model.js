const { Schema, model, SchemaTypes } = require("mongoose");

const AccessoriesSchema = new Schema({
    brand: SchemaTypes.String,
    product_name: SchemaTypes.String,
    price: SchemaTypes.Decimal128,
    product_group: SchemaTypes.String
})

const Accessory = model("accessory", AccessoriesSchema);

module.exports = Accessory; 