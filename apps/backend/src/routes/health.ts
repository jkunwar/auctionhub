import { FastifyPluginAsync } from "fastify";

const healthRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get('/health', async (request, reply) => {
    await fastify.prisma.$queryRaw`SELECT 1`

    return reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: fastify.config.NODE_ENV,
      database: 'connected'
    })
  })
}

export default healthRoute