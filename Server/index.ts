import { createServer } from 'src/server';

createServer()
  .then(server => {
    server.listen({ host: "localhost", port: 3000 }, (err, address) => {
      if (err) {
        console.error(
          { err, address },
          `Error while trying to listen to "localhost:3000"`
        );
        process.exit(1);
      }
    });
  })
  .catch(err => console.error({ err }, 'Unexpected Error from Server caught on top level'));

process.on('uncaughtException', err => {
  console.error({ err }, 'Uncaugh Exception');
  console.warn('Shutting down server because of uncaught exception');

  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    {
      error: reason,
    },
    'Unhandled Promise Rejection'
  );

  // need to log the promise without stringifying it to properly
  // display all rejection info
  console.warn({ promise });

  // TODO: stream errors to sentry

  process.exit(1);
});
