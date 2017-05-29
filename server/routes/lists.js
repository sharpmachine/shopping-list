const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var listSchema = new Schema({
  name: String,
  items: Array
})

const List = mongoose.model('List', listSchema);

// Get all
router.get('/lists', (req, res, next) => {
  List.find({}, (err, lists) => {
    err ? res.send(err) : res.json(lists)
  })
});

// Get one
router.get('/lists/:id', (req, res, next) => {
  const listId = req.params.id

  List.findById(listId, (err, list) => {
    err ? res.send(err) : res.json(list)
  })
});

// Update or Create 
router.post('/lists', (req, res, next) => {
  const list = List(req.body);

  List.findByIdAndUpdate(list._id, list, {
    upsert: true,
    new: true
  }, (err, list) => {
    err ? res.send(err) : res.json(list)
  })

});

// Delete
router.delete('/lists/:id', (req, res, next) => {
  const listId = req.params.id;

  List.findByIdAndRemove(listId, (err, list) => {
    err ? res.send(err) : res.json(list)
  })
});


module.exports = List;
module.exports = router;

// TODO: Exception handling
// TODO: Sorting
