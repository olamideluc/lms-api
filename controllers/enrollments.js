const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all enrollments
const getAllEnrollments = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('enrollments')
            .find();

        const enrollments = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(enrollments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET enrollment by ID
const getSingleEnrollment = async (req, res) => {
    try {
        const enrollmentId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('enrollments')
            .find({ _id: enrollmentId });

        const enrollments = await result.toArray();

        res.status(200).json(enrollments[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST
const createEnrollment = async (req, res) => {
    try {
        const enrollment = {
            studentId: req.body.studentId,
            courseId: req.body.courseId,
            enrollmentDate: req.body.enrollmentDate,
            status: req.body.status
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('enrollments')
            .insertOne(enrollment);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT
const updateEnrollment = async (req, res) => {
    try {
        const enrollmentId = new ObjectId(req.params.id);

        const enrollment = {
            studentId: req.body.studentId,
            courseId: req.body.courseId,
            enrollmentDate: req.body.enrollmentDate,
            status: req.body.status
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('enrollments')
            .replaceOne(
                { _id: enrollmentId },
                enrollment
            );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE
const deleteEnrollment = async (req, res) => {
    try {
        const enrollmentId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('enrollments')
            .deleteOne({ _id: enrollmentId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllEnrollments,
    getSingleEnrollment,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment
};