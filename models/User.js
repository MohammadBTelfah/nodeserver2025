const mongoose = require('mongoose')
const bycrypt = require('bcrypt') 
const UserSchema=   new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
   }
})
// hash the password before saving the user
UserSchema.pre('save', async function(next){
    if(!this.isModified('Password')){
        return next()
    }
    try {
        const salt = await bycrypt.genSalt(10)
        this.Password = await bycrypt.hash(this.Password, salt)
        next()
        
    } catch (error) {
        next(error)
    }
});
module.exports = mongoose.model('User', UserSchema)