// Create web server

// Import package
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import model
const Comments = require('../models/comments');

// Use body-parser
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// Setup mongoose
mongoose.connect('mongodb://localhost:27017/comments', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Setup router
router.get('/', (req, res) => {
    Comments.find({}, (err, comments) => {
        if (err) {
            res.status(500).send('Error');
        }
        res.status(200).send(comments);
    });
});

router.post('/', (req, res) => {
    let comment = new Comments({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((err) => {
        if (err) {
            res.status(500).send('Error');
        }
        res.status(200).send('Success');
    });
});

// Export router
module.exports = router;