const router = require('express').Router();
const enrollmentsController = require('../controllers/enrollments');
const validation = require('../middleware/validate');
router.get('/', enrollmentsController.getAllEnrollments);

router.get('/:id', enrollmentsController.getSingleEnrollment);
router.post(
    '/',
    validation.enrollmentValidationRules,
    enrollmentsController.createEnrollment
);

router.put(
    '/:id',
    validation.enrollmentValidationRules,
    enrollmentsController.updateEnrollment
);
router.delete('/:id', enrollmentsController.deleteEnrollment);

module.exports = router;