const router = require('express').Router();

router.use('/api-docs', require('./swagger'));

router.get('/', (req, res) => {
    // #swagger.tags = ['Home']
    res.send('Learning Management System API');
});

router.use('/users', require('./users'));
router.use('/courses', require('./courses'));

module.exports = router;