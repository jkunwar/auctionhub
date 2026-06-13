import Fastify from "fastify";
import FastifyEnv from "@fastify/env";
import FastifySwagger from "@fastify/swagger";
import FastifySwaggerUi from "@fastify/swagger-ui";

import { configSchema } from "./config";
import prismaPlugin from "./plugins/prisma";
import healthRoute from "./routes/health";

export async function buildApp() {
  const fastify = Fastify({
    logger: {
      transport: process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined
    },
  });

  await fastify.register(FastifyEnv, {
    schema: configSchema,
    dotenv: false,
  });

  await fastify.register(FastifySwagger, {
    openapi: {
      info: {
        title: 'AuctionHub Nepal API',
        description: 'Backend API for AuctionHub Nepal — operator-consignment auction platform.',
        version: '0.1.0',
      },
      servers: [
        { url: 'http://localhost:3001', description: 'Development' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });

  // Swagger UI is only served in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    await fastify.register(FastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'list',
        deepLinking: true,
      },
    });
  }

  await fastify.register(prismaPlugin);

  await fastify.register(healthRoute);

  return fastify;
}