const User= require('../models/User')
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
        user ={Name, Email, Password}
        savedUser = new User(user)
        savedUser.save()
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