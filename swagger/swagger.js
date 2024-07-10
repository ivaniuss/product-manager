import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const products = {
  // Define your Swagger paths for products here
};

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Manager API",
      version: "1.0.0",
      description: "API para gestionar productos",
      contact: {
        name: "Ivan",
        email: "ivan.emi94@gmail.com",
        url: "http://github.com/ivaniuss",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          name: "Authorization",
          in: "header",
        },
      },
      schemas: {
        Product: {
          type: "object",
          required: ["name", "price"],
          properties: {
            id: {
              type: "integer",
              description: "ID auto-generado del producto",
            },
            name: {
              type: "string",
              description: "Nombre del producto",
            },
            price: {
              type: "number",
              description: "Precio del producto",
            },
            description: {
              type: "string",
              description: "Descripción del producto",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Products",
        description: "Gestión de productos",
      },
    ],
    security: [
      {
        bearerAuth: [],
      },
    ],
    paths: {
      ...products,
    },
  },
  apis: ['./api/**/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default swaggerDocs;
