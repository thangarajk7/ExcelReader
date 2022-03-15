const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  Oid: { type: String, required: true ,index: true,unique: true},
  OrdreDate: { type: String, required: true },
  Region: { type: String, required: true },
  City: { type: String, required: true },
  Category: { type: String, required: true },
  Product: { type: String, required: true },
  Quantity: { type: Number, required: true },
  UnitPrice: { type: Number, required: true },
  TotalPrice: { type: Number, required: true },
  //date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Orders = mongoose.model('Orders', orderSchema);

Orders.ensureIndexes(function(err) {
  if (err)
      console.log(err);
  else
      console.log('create profile index successfully');
});
module.exports = Orders;