const User= require('../models/User')
const bycrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY
// create a function to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({Message: error.Message})
    }
}
// create a function to create a user
exports.createUser = async (req, res) => {
    const {Name , Email, Password} = req.body;
    try {
        const user = {Name, Email, Password}
        const savedUser = new User(user)
        await savedUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json({Message: error.Message})
    }
}
// create a function to get user by Name 
exports.getUserByname = async (req, res) => {
    const {Name}=req.body
    console.log(Name)
    try {
        const user = await User.find({Name:Name})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({Message: error.Message})
    }
}
// create a function tp update user by id
exports.updateUser = async (req, res) => {
    const {id} = req.params
    const {Name, Email, Password} = req.body
    try {
        const user= await User.findByIdAndUpdate (id, {Name, Email, Password})
        res.status(200).json({message: 'User updated successfully'})
        } catch (error) {
            res.status(500).json({Message: error.Message})
        }
    }
    // create a function to delete user by id
    exports.deleteUser = async (req, res) => {
        const {id} = req.params
            try {
                await User.findByIdAndDelete(id)
                res.status(200).json({message: 'User deleted successfully'})
            } catch (error) {
                res.status(500).json({Message: error.Message})
            }
        }
        // create a function to get user by id
        exports.getUserById = async (req, res) => {
            const {id} = req.params
            try {
                const user = await User.findById(id)
                res.status(200).json(user)
            } catch (error) {
                res.status(500).json({Message: error.Message})
            }
        }
        //create the function to login and decrypt the password
        exports.login = async (req, res) => {
            const {Email, Password} = req.body
            try {
                const user = await User.findOne({Email:Email})
                if(!user){
                    return res.status(400).json({Message: 'User not found'})
                }
                const isMatch = await bycrypt.compare(Password, user.Password)
                if(!isMatch){
                    return res.status(400).json({Message: 'Invalid Password'})
                }
                const token = jwt.sign({userId: user._id, Role: user.Role}, SECRET_KEY, {expiresIn: '1h'})
                res.status(200).json({Message: 'User logged in successfully', token})
            } catch (error) {
                res.status(500).json({Message: error.Message})
            }
        }
        exports.auth = async (req, res, next) => {
            const token = req.header('Authorization')
            if (!token) {
                return res.status(401).json({ Message: 'token not found' })
            }
            try {
                const verified = jwt.verify(token, SECRET_KEY)
                req.user = verified
                next()
            } catch (error) {
                res.status(400).json({ Message: 'Invalid Token' })
            }
        }
        exports.admin = async (req, res, next) => {
            const token = req.header('Authorization')
            if (!token) {
                return res.status(401).json({ Message: 'token not found' })
            }
            try {
                const verified = jwt.verify(token, SECRET_KEY)
                console.log(verified)
                if(verified.Role !== 'Admin'){
                    return res.status(401).json({ Message: 'You are not authorized to access this route' })
                }
                req.user = verified
                next()
            } catch (error) {
                res.status(400).json({ Message: 'Invalid Token' })
            }
        }