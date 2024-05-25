const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const sameFields = {
    active: {
        type: Boolean,
        default: true
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
    },
    modify_dt: {
        type: Date,
        default: Date.now()
    }
}

const childModulesList = new Schema(
    {
        submdname: {
            type: String
        },
        icon: {
            type: String
        },
        routerLink: {
            type: String
        },
        ...sameFields
    }
);

const moduleSchemaList = new Schema({
    mdname: {
        type: String
    },
    ...sameFields,
    mdchilds: [childModulesList]
});
moduleSchemaList.index({ mdname: 1 });
const modulesList = model('module', moduleSchemaList);
module.exports = modulesList;