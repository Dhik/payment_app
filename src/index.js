// src/index.js

const fastify = require('fastify')({ logger: true });

// Register routes
fastify.register(require('./routes/accounts'));
fastify.register(require('./routes/transactions'));

// Run the server
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
