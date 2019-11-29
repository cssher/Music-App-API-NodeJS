const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true,
        default: ''
    }
});

const SongSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true
    },
    albumName: {
        type: String,
        required: true,
        default: ''
    },
    genre: {
        type: String,
        required: true
    },
    comments: [CommentSchema]
});

const Song = mongoose.model('Song', SongSchema);

module.exports = Song;