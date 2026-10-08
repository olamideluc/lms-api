const Joi = require('joi');

const userValidationRules = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        dateJoined: Joi.string().required(),
        status: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

const courseValidationRules = (req, res, next) => {
    const schema = Joi.object({
        courseCode: Joi.string().required(),
        courseName: Joi.string().required(),
        credits: Joi.number().required(),
        instructor: Joi.string().required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

module.exports = {
    userValidationRules,
    courseValidationRules
};