const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/items.controller');

// CRUD Routes
router.get('/', itemsController.getAllItems);
router.post('/', itemsController.createItem);
router.put('/:id', itemsController.updateItem);
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
