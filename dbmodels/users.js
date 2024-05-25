const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    uname: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    empid: {
        type: String,
        require: true,
    },
    A : {
        type : String,
        require : true
    },
    gender: {
        type: String,
        require: true,
    },
    gendername: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    cader: {
        type: String,
        require: true
    },
    cadername: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    create_by: {
        type: String,
        require: true,
    },
    create_dt: {
        type: Date,
        default: Date.now(),
    },
    modify_by: {
        type: String,
        // require: true
    },
    modify_dt: {
        type: Date,
        default: Date.now()
    },
    active: {
        type: Boolean,
        require: true,
    },
    companyid: {
        type: String,
    },
    branchid: {
        type: String,
    },
    companyname: {
        type: String,
    },
    branchname: {
        type: String,
    }
});

userSchema.index({ uname: 1 });
const userCreate = model('users', userSchema);
module.exports = userCreate;