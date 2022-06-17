const { User } = require('../models')
const { db } = require('../models/User')

const UserController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            // populate all comments
            .populate({
                path: 'thoughts'
            })
            // filter data in decending order
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    // get user by id
    getUserById({ params }, res){
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: `No User found by that id`})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    // create User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err))
    },

    // update User by id
    updateUserById({ params, body }, res) {
        User.findOneAndUpdate({_id: params.id}, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No User found by that Id' })
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // delete User
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(400).json({ message: 'No User found by that Id'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    }
}

module.exports = UserController