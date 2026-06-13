import { buildApp } from "./app";

async function start() {
  const app = await buildApp();

  const shutdown = async (signal: string) => {
    app.log.info(`${signal} received — shutting down`)
    await app.close()
    process.exit(0)
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT',  () => shutdown('SIGINT'))

  process.on('unhandledRejection', (err) => {
    app.log.error(err, 'Unhandled rejection')
    process.exit(1)
  })

  try {
    const port = parseInt(app.config.PORT, 10);

    await app.listen({ port, host: '0.0.0.0' })

    app.log.info(`Server running at http://localhost:${port}`)
    app.log.info(`Health check: http://localhost:${port}/health`)
  } catch (err) {
    app.log.error(err)
    process.exit(1);
  }
}

start();