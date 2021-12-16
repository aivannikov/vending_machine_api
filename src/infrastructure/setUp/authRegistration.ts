import { FastifyInstance } from 'fastify';
import fastifyJWT from 'fastify-jwt'
import fastifyGuard from 'fastify-guard'


let func = (app: FastifyInstance) => {
    // make it call only once
    func = () => {};
    app.register(fastifyJWT, {
        secret: 'secret'
      })
      app.register(
        fastifyGuard,
        {
          errorHandler: (result, req, reply) => {
            return reply.send('you are not allowed to call this route')
          }
        }
      )
}

const authRegistration = func;
export default authRegistration;
