import SwaggerUi from 'swagger-ui-express'
import swaggerJsDocs from 'swagger-jsdoc'
import { Router } from 'express'
import { PORT } from './config.js'

const router = Router()

const swaggerDoc = swaggerJsDocs({
  swaggerDefinition: {
    openapi: '3.0.0',
    servers: [
      {
        url: `http://localhost:${PORT}`,
        title: 'Pressa app',
        description: 'Pressa app api'
      }
    ],
    info: {
      version: '1.0.0',
      title: 'Pressa app',
      description: 'pressa app .......'
    },
    components: {
      securitySchemes: {
        Bearer: {
          type: 'apiKey',
          name: 'token',
          in: 'header',
          description: 'Please use login api to get access_token'
        }
      }
    }
  },
  apis: [
    `${process.cwd()}/src/swagger/components/*.yaml`,
    `${process.cwd()}/src/swagger/docs/*.yaml`,
  ]


})

router.use('/', SwaggerUi.serve, SwaggerUi.setup(swaggerDoc))

export default router