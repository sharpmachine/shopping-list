const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var itemSchema = new Schema({
  name: String,
  price: Number,
  isPriceEstimate: Boolean,
  quantity: Number
})

const Item = mongoose.model('Item', itemSchema);

// Get all
router.get('/items', (req, res, next) => {
  Item.find({}, (err, items) => {
    err ? res.send(err) : res.json(items)
  })
});

// Create 
router.post('/items', (req, res, next) => {
  const newItem = Item(req.body);

  newItem.save((err, item) => {
    err ? res.send(err) : res.json(item)
  })
});

// Update
router.put('/items/:id', (req, res, next) => {
  const itemToUpdate = Item(req.body);

  Item.findByIdAndUpdate(itemToUpdate._id, itemToUpdate, (err, item) => {
    err ? res.send(err) : res.json(item)
  })
});

// Delete
router.delete('/items/:id', (req, res, next) => {
  const itemId = req.params.id;

  Item.findByIdAndRemove(itemId, (err, item) => {
    err ? res.send(err) : res.json(item)
  })
});


module.exports = Item;
module.exports = router;

// TODO: Exception handling
// TODO: Sorting
