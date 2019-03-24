const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//item model
const Item = require('../../models/Item');

// @route get api/items
// @desc get all items
//@access Public
router.get('/', (reg, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route Post api/items
// @desc Create a item
//@access Private
router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete a item
//@access Private
router.delete('/:id', auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err =>
      res.status(404).json({ success: false } /* , console.log(err) */)
    );
});

module.exports = router;
