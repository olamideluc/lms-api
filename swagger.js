const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Learning Management System API',
        description: 'LMS API for managing users and courses'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);