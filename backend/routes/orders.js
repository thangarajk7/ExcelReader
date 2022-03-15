const router = require('express').Router();
const Orders = require('../models/order.model');

router.route('/add').post((req, res) => {
  const Oid = req.body.Oid;
  const OrdreDate = req.body.OrdreDate;
  const Region = req.body.Region;
  const City = req.body.City;
  const Category = req.body.Region;
  const Product = req.body.Product;
  const Quantity = Number(req.body.Quantity);
  const UnitPrice = Number(req.body.UnitPrice);
  const TotalPrice = Number(req.body.TotalPrice);

  const newOrder = new Orders({
  Oid,
  OrdreDate,
  Region,
  City,
  Category,
  Product,
  Quantity,
  UnitPrice,
  TotalPrice,
  });

  
    newOrder.save()
    .then(() => res.json('Products added!'))
    .catch(err =>{
      console.log('error : duplicate Id '+newOrder.Oid)
    });
});

module.exports = router;