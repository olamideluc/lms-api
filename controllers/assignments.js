const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all assignments
const getAllAssignments = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('assignments')
            .find();

        const assignments = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(assignments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET assignment by id
const getSingleAssignment = async (req, res) => {
    try {
        const assignmentId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('assignments')
            .find({ _id: assignmentId });

        const assignments = await result.toArray();

        res.status(200).json(assignments[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST
const createAssignment = async (req, res) => {
    try {
        const assignment = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            courseId: req.body.courseId
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('assignments')
            .insertOne(assignment);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT
const updateAssignment = async (req, res) => {
    try {
        const assignmentId = new ObjectId(req.params.id);

        const assignment = {
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate,
            courseId: req.body.courseId
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('assignments')
            .replaceOne(
                { _id: assignmentId },
                assignment
            );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
const deleteAssignment = async (req, res) => {
    try {
        const assignmentId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('assignments')
            .deleteOne({ _id: assignmentId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllAssignments,
    getSingleAssignment,
    createAssignment,
    updateAssignment,
    deleteAssignment
};