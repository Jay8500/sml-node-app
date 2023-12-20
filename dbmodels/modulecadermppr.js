const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    uname: {
        type: String,
        require: true,
        default: 'dev admin'
    },
    password: {
        type: String,
        require: true,
        default: 'dev admin'
    },
    cader: {
        type: String,
        require: true
    },
    create_by: {
        type: String,
        require: true,
        default: 'dev admin'
    },
    create_dt: {
        type: Date,
        default: Date.now(),
    },
    modify_by: {
        type: String,
        default: 'dev admin'
        // require: true
    },
    modify_dt: {
        type: Date,
        default: Date.now()
    },
    cader_id_: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        default: true
    }
});

const userCreate = model('users', userSchema);
module.exports = userCreate;