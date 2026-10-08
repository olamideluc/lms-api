const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// GET all users
const getAllUsers = async (req, res) => {
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .find();

        const users = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET single user
const getSingleUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const result = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .find({ _id: userId });

        const users = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// POST new user
const createUser = async (req, res) => {
    try {
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role,
            phoneNumber: req.body.phoneNumber,
            dateJoined: req.body.dateJoined,
            status: req.body.status
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .insertOne(user);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json({
                message: 'Failed to create user.'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// PUT update user
const updateUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            role: req.body.role,
            phoneNumber: req.body.phoneNumber,
            dateJoined: req.body.dateJoined,
            status: req.body.status
        };

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .replaceOne(
                { _id: userId },
                user
            );

        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({
                message: 'Failed to update user.'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE user
const deleteUser = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);

        const response = await mongodb
            .getDatabase()
            .db()
            .collection('users')
            .deleteOne({ _id: userId });

        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({
                message: 'Failed to delete user.'
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
};