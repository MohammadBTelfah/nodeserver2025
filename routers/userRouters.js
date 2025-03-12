const express = require('express');
const router = express.Router();
const {  auth, getAllUsers, createUser,getUserByname, updateUser, deleteUser, getUserById,login, admin}= require('../controllers/userController');
router.get('/users', admin, getAllUsers)
router.post('/users', getUserByname)
router.post('/createusers', createUser)
router.put('/updateUser/:id', updateUser)
router.delete('/deleteUser/:id', deleteUser)
router.get('/getUserById/:id', getUserById)
router.post('/login', login)
router.get('/auth', auth)
router.get('/admin',admin)
module.exports = router