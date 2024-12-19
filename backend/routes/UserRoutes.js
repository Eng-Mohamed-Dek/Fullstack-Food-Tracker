const express = require('express');
const { Signup, Login } = require('../controllers/userControllers');
const router = express.Router();

// sign up api 
router.post('/signup', Signup)

//login api
router.post('/login' , Login)

module.exports = router;

