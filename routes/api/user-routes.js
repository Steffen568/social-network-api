const { get } = require('mongoose')
const router = require('express').Router()
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUserById,
    deleteUser
} = require('../../controllers/user-controller')


router
    .route('/')
    .get(getAllUsers)
    .post(createUser)


router
    .route('/:id')
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUser)



module.exports = router