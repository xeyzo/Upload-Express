const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: String,
    description: String,
    photo: String,
    status: {
        type: Boolean,
        default: false
    }
}, {collection: 'todo'});

module.exports = mongoose.model('todoModel', taskSchema);