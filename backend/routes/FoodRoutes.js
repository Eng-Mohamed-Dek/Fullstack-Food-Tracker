const express = require('express');
const {readData, createData, deleteData } = require('../controllers/foodControllers');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

// middleware 
router.use(requireAuth)

// CRUD - create , read , update , delete 

// Get All Foods - READ
router.get('/', readData)

// Post / Create a new Food Item - CREATE
router.post('/', createData)

// Delete / Delete a new Food Item - CREATE
router.delete('/:id', deleteData)

// export routes 
module.exports = router;
