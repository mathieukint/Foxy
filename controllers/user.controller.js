const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err){
            res.send(docs);
        } else {
            console.log('ID inconnu : ' + err);
        }
    }).select('-password');
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }

    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {
                new: true,
                upsert: true,
                setDefaultsOnInsert: true
            },
            (err, docs) => {
                if (!err) {
                    return res.send(docs);
                } else {
                    return res.status(500).send({message: err});
                }
            }
        )
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }

    try {
        await UserModel.remove({_id: req.params.id}).exec();
        res.status(200).json({message: 'Compte effacé avec succès'});
    } catch (err) {
        return res.status(500).json({message: err});
    }
}

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }

    try {
        // add to follower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {following: req.body.idToFollow}},
            {new: true, upsert: true},
            (err,docs) => {
                if (!err) {
                    return res.status(201).json(docs);
                } else {
                    return res.status(400).json(err);
                }
            }
        )
        // add to following list
        await UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            {$addToSet: {following: req.params.id}},
            {new: true, upsert: true},
            (err,docs) => {
                if (!err) {
                    return res.status(201).json(docs);
                } else {
                    return res.status(400).json(err);
                }
            }
        )
    } catch (err) {
        return res.status(500).json({message: err});
    }

}




module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)) {
        return res.status(400).send('ID inconnu : ' + req.params.id);
    }

    try {
        // pull from follower list
        await UserModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {following: req.body.idToUnfollow}},
            {new: true, upsert: true},
            (err,docs) => {
                if (!err) {
                    return res.status(201).json(docs);
                } else {
                    return res.status(400).json(err);
                }
            }
        )
        // pull from following list
        await UserModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            {$pull: {following: req.params.id}},
            {new: true, upsert: true},
            (err,docs) => {
                if (!err) {
                    return res.status(201).json(docs);
                } else {
                    return res.status(400).json(err);
                }
            }
        )
    } catch (err) {
        return res.status(500).json({message: err});
    }
}