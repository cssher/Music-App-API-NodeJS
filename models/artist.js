const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    isFamous: {
        type: Boolean,
        default: false
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;