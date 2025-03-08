const express = require('express');
const router = express.Router();
const {  auth, getAllUsers, createUser,getUserByname, updateUser, deleteUser, getUserById,login}= require('../controllers/userController')
router.get('/users', auth, getAllUsers)
router.post('/users', getUserByname)
router.post('/createusers', createUser)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)
router.get('/getUserById/:id', getUserById)
router.post('/login', login)
router.get('/auth', auth)
module.exports = router