import { SwaggerConfig } from '@ioc:Adonis/Addons/Swagger'

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: 'docs', // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: '/swagger.json',

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Users system',
        version: '1.0.0',
        description: 'Users system with authorization',
      },
    },

    apis: [
      // 'app/**/*.ts',
      'docs/swagger/**/*.yml',
      // 'start/routes.ts'
    ],
    basePath: '/',
  },
} as SwaggerConfig
