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
    const {name , email, password} = req.body;
    try {
        user ={name, email, password}
        savedUser = new User(user)
        savedUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json({Message: error.Message})
    }
}