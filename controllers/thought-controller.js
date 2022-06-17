const Thoughts = require('../models/Thoughts')
const User  = require('../models/User')
const db = require('../models/User')

const thoughtController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
            .populate({
                path: 'thoughts'
            })
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            })
    },
    
    getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .populate({
                path: 'thoughts'
            })
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({ message: 'No thoughts found by that id'})
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res,status(400).json(err)
            })
    }, 

    addThought({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                // push method addds comments to _id to the specific pizza we want to update
                { $push: { thoughts: _id } },
                { new: true }
            );
            })
            .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    removeThought({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
              return res.status(404).json({ message: 'No Thought with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { comments: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },

}