/* rest apis to handle business operations */
const express = require('express');
const musicRouter = express.Router();
// models - mongoose structures
const User = require('../models/user');
const Song = require('../models/song');
const Artist = require('../models/artist');

// add user
musicRouter.route('/user')  // localhost:9890/music/user
    .get((req, res, next) => {

        User.find({})
            .then((users) => {
                res.status(200).json({
                    success: true,
                    users
                });
            })
            .catch((err) => console.log(`Error: ${err}`));
    })
    .post((req, res, next) => {

        const { firstName, lastName } = req.body;

        User.findOne({ $and: [{ firstName }, { lastName }] })
            .then((user) => {
                if (user !== null) {
                    return res.status(200).json({
                        message: 'user already exists'
                    });
                }

                let newUser = new User(req.body);

                newUser.save()
                    .then((user) => {
                        res.status(200).json({
                            success: true,
                            message: 'New user successfully created',
                            user
                        });
                    })
                    .catch((err) => console.log(`Error: ${err}`));
            })
            .catch((err) => console.log(`Error: ${err}`));;
    });

// add artist
musicRouter.route('/artist')  // localhost:9890/music/artist
    .get((req, res, next) => {

        Artist.find({})
            .then((artists) => {
                res.status(200).json({
                    success: true,
                    artists
                });
            })
            .catch((err) => console.log(`Error: ${err}`));
    })
    .post((req, res, next) => {

        const { firstName, lastName, isFamous } = req.body;

        Artist.findOne({ $and: [{ firstName }, { lastName }] })
            .then((artist) => {
                if (artist !== null) {
                    return res.status(200).json({
                        message: 'artist already exists'
                    });
                }

                let newArtist = new Artist(req.body);

                newArtist.save()
                    .then((artist) => {
                        res.status(200).json({
                            success: true,
                            message: 'New artist successfully created',
                            artist
                        });
                    })
                    .catch((err) => console.log(`Error: ${err}`));
            })
            .catch((err) => console.log(`Error: ${err}`));;
    });

// fetch famous artists
musicRouter.route('/artist/famous')  // localhost:9890/music/artist/famous
    .get((req, res, next) => {

        Artist.find({ isFamous: true })
            .then((artists) => {
                res.status(200).json({
                    success: true,
                    artists
                });
            })
            .catch((err) => console.log(`Error: ${err}`));
    });

// add song
musicRouter.route('/song')  // localhost:9890/music/song
    .get((req, res, next) => {

        Song.find({})
            .populate('artist')
            .then((songs) => {
                res.status(200).json({
                    success: true,
                    songs
                });
            })
            .catch((err) => console.log(`Error: ${err}`));
    })
    .post((req, res, next) => {

        const { title, artist } = req.body;

        Song.findOne({ $and: [{ title }, { artist }] })
            .then((song) => {
                if (song !== null) {
                    return res.status(200).json({
                        message: 'song already exists'
                    });
                }

                let newSong = new Song(req.body);

                newSong.save()
                    .then((song) => {
                        res.status(200).json({
                            success: true,
                            message: 'New song successfully created',
                            song
                        });
                    })
                    .catch((err) => console.log(`Error: ${err}`));
            })
            .catch((err) => console.log(`Error: ${err}`));
    });

// add comment to song
// check for more than one more comment added
musicRouter.route('/song/comment')
    .post((req, res, next) => {
        
        // Note: req will contain the song _id
        Song.findOne({ _id: req.body.songId })
            .then((song) => {

                if (song === null) {
                    res.status(404).json({
                        success: false,
                        message: 'Song not in database'
                    });
                }

                let newComment = {
                    user: req.body.userId,
                    comment: req.body.comment
                };

                // pati way to handle duplicate comments
                const filteredComments = song.comments.filter((comment) => {
                        return comment.user.equals(req.body.userId)
                });

                if (filteredComments.length !== 0) {
                    return res.status(200).json({
                        success: false,
                        message: `Comment by user id: ${req.body.userId} already exists`
                    });
                }

                song.comments.push(newComment);

                song.save() 
                    .then((song) => {
                        res.status(200).json({
                            success: true,
                            message: 'Comment successfully added'
                        });
                    })
                    .catch((err) => console.log(`Error: ${err}`));
            })
            .catch((err) => console.log(`Error: ${err}`));

    });

// fetch songs of famous artist
musicRouter.route('/famoussongs')   // localhost:9890/music/famoussongs
        .get((req, res, next) => {

            Song.find({})
                .populate('artist')
                .then((songs) => {
                    
                    // simpler approach
                    const filteredSongs = songs.filter((song) => {
                        return song.artist.isFamous;
                    });

                    res.status(200).json({
                        success: true,
                        songs: filteredSongs
                    });

                });

        });

module.exports = musicRouter;