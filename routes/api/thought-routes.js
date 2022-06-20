const router = require('express').Router()
const {
    getAllThoughts,
    getThoughtsById,
    addThought,
    removeThought
} = require('../../controllers/thought-controller')


router.route('/:userId/:toughtsId').delete(removeThought)

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought)

    router.route('/:thoughtsId').get(getThoughtsById)


module.exports = router