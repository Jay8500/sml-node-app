const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const cadersSchema = new Schema({
    cdname: {
        type: String
    },
    active: {
        type: Boolean
    },
    code: {
        type: String
    }
});
cadersSchema.index({ cdname: 1 });
const caders = model('cader', cadersSchema, 'cader');
module.exports = caders;