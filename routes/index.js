const router = require('express').Router()
const apiRoutes = require('../routes/api')


router.use('/api', apiRoutes)

router.use((req, res) => {
    res.status(400).send('<h1> 404 Error! <h1>')
})


module.exports = router