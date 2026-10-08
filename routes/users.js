const router = require('express').Router();
const usersController = require('../controllers/users');
const validation = require('../middleware/validate');


router.get('/', usersController.getAllUsers); // #swagger.tags = ['Users']

router.get('/:id', usersController.getSingleUser); // #swagger.tags = ['Users']

// #swagger.tags = ['Users']
router.post(
    '/',
    validation.userValidationRules,
    usersController.createUser
);

// #swagger.tags = ['Users']
router.put(
    '/:id',
    validation.userValidationRules,
    usersController.updateUser
);

// #swagger.tags = ['Users']
router.delete('/:id', usersController.deleteUser);

module.exports = router;