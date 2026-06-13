import { FastifyPluginAsync } from "fastify";

const healthRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async (_request, reply) => {
    try {
      await fastify.prisma.$queryRaw`SELECT 1`
    } catch {
      return reply.status(503).send({
        status: 'error',
        timestamp: new Date().toISOString(),
        environment: fastify.config.NODE_ENV,
        database: 'disconnected'
      })
    }

    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: fastify.config.NODE_ENV,
      database: 'connected'
    })
  })
}

export default healthRoute