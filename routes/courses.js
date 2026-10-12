const router = require('express').Router();
const coursesController = require('../controllers/courses');
const validation = require('../middleware/validate');
const auth = require('../middleware/auth');

router.get('/', coursesController.getAllCourses);  // #swagger.tags = ['Courses']

router.get('/:id', coursesController.getSingleCourse); // #swagger.tags = ['Courses']

// #swagger.tags = ['Courses']
router.post(
    '/',
    auth.isAuthenticated,
    validation.courseValidationRules,
    coursesController.createCourse
);


// #swagger.tags = ['Courses']
router.put(
    '/:id',
    auth.isAuthenticated,
    validation.courseValidationRules,
    coursesController.updateCourse
);
router.delete('/:id', coursesController.deleteCourse);   // #swagger.tags = ['Courses']

module.exports = router;