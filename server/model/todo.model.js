const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
    todo: {
        type:String,
        required: [true, 'Todo should not be empty']
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Todo', TodoSchema);