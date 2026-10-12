const router = require('express').Router();
const assignmentsController = require('../controllers/assignments');
const validation = require('../middleware/validate');
router.get('/', assignmentsController.getAllAssignments);

router.get('/:id', assignmentsController.getSingleAssignment);

router.post(
    '/',
    validation.assignmentValidationRules,
    assignmentsController.createAssignment
);

router.put(
    '/:id',
    validation.assignmentValidationRules,
    assignmentsController.updateAssignment
);

router.delete('/:id', assignmentsController.deleteAssignment);

module.exports = router;