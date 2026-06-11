export const configSchema = {
  type: 'object',
  required: ['PORT', 'DATABASE_URL', 'REDIS_URL', 'JWT_SECRET', 'EMAIL_VERIFY_SECRET'],
  properties: {
    PORT: { type: 'string', default: '3001' },
    NODE_ENV: { type: 'string', default: 'development' },
    DATABASE_URL: { type: 'string' },
    REDIS_URL: { type: 'string' },
    JWT_SECRET: { type: 'string', minLength: 32 },
    EMAIL_VERIFY_SECRET: { type: 'string' },
  }
}

export interface AppConfig {
  PORT: string
  NODE_ENV: string
  DATABASE_URL: string
  REDIS_URL: string
  JWT_SECRET: string
  EMAIL_VERIFY_SECRET: string
}

declare module 'fastify' {
  interface FastifyInstance {
    config: AppConfig
  }
}