const express = require('express');
const router = express.Router();
const { getAllUsers, createUser,getUserByname, updateUser, deleteUser, getUserById}= require('../controllers/userController')
router.get('/users', getAllUsers)
router.post('/users', getUserByname)
router.post('/createusers', createUser)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)
router.get('/getUserById/:id', getUserById)
module.exports = router