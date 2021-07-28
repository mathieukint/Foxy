const postModel = require('../models/post.model');
const userModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log(`erreur sur l'obtention des données : ` + err);
        }
    })
}

module.exports.createPost = async (req, res) => {
    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        picture: req.body.picture,
        video: req.body.video,
        likers: [],
        comments: []
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err)
    }
}

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }

    const updatedRecord = {
        message: req.body.message
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        {$set: updatedRecord},
        {new: true},
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('erreur de mise à jour : ' + err);
            }
        }
    )
}

module.exports.deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }

    postModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) {
                res.send(docs);
            } else {
                console.log('erreur de suppression de post : ' + err);
            }
        }
    );
}