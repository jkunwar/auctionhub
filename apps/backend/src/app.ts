import Fastify from "fastify";
import FastifyEnv from "@fastify/env";

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

  await fastify.register(prismaPlugin);
  await fastify.register(healthRoute);

  return fastify;
}