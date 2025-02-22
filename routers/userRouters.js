const express = require('express');
const router = express.Router();
const { getAllUsers, createUser,getUserByname}= require('../controllers/userController')
router.get('/users', getAllUsers)
router.post('/users', getUserByname)
router.post('/createusers', createUser)
module.exports = router