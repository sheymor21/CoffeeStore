const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require("swagger-jsdoc");
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Coffee Store',
            version: '1.0.0',
        },
    },
    apis: ["./src/routes/*.js"],
};

const spec = swaggerJsdoc(options);

module.exports = {swaggerUi, spec};