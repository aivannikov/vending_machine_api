import { FastifyRequest, FastifyReply } from "fastify"

const checkAuthorization = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
      
    } catch (err) {
      reply.send(err)
    }
  }

export { checkAuthorization }  