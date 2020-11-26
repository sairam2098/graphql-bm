const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
    title: String,
    author: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('books', bookSchema);