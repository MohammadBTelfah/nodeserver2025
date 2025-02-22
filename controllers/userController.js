const User= require('../models/User')

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.log('Error: ', error)
        res.status(500).json({Message: error.Message})
    }
}
exports.createUser = async (req, res) => {
    const {Name , email, password} = req.body;
    try {
        user ={Name, email, password}
        savedUser = new User(user)
        savedUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json({Message: error.Message})
    }
}
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