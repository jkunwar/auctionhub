import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import { PrismaClient } from '@auctionhub/database'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async fastify => {
  const prisma = new PrismaClient({
    log: fastify.config.NODE_ENV === 'development'
      ? ['query', 'info', 'warn', 'error']
      : ['error']
  })

  await prisma.$connect()
  fastify.decorate('prisma', prisma)

  fastify.addHook('onClose', async (instance) => {
    await instance.prisma.$disconnect()
  })

  fastify.log.info('Connected to database')
})

export default prismaPlugin