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