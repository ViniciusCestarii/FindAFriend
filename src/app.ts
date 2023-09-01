import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(petsRoutes)

app.setErrorHandler((error, _, reply) => {
  if(error instanceof ZodError) {
    return reply
        .status(400)
        .send({message: "Validation error", issues: error.format()})
  }

  if (env.NODE_ENV !== "production"){
    console.error(error)
  } else {
    // TODO log error to external service
  }

  return reply.status(500).send({message: "Internal server error"})
})