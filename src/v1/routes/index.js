var router = require('express').Router()

router.use('/auth', require('./auth'))
router.use('/boards', require('./board'))
router.use('/boards/:boardId/lists', require('./list'))
router.use('/boards/:boardId/tasks', require('./task'))

module.exports = router;
