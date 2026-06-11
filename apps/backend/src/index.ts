import { buildApp } from "./app";

async function start() {
  const app = await buildApp();

  try {
    const port = parseInt(app.config.PORT, 10);

    await app.listen({
      port,
      host: '0.0.0.0'
    })

    app.log.info(`Server running at http://localhost:${port}`)
    app.log.info(`Health check: http://localhost:${port}/health`)
  } catch (err) {
    app.log.error(err)
    process.exit(1);
  }
}

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err)
  process.exit(1);
});

start();