const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
})

var user = mongoose.model('clown',userSchema);
module.exports = user;