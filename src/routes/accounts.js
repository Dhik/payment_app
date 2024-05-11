const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

module.exports = async function (fastify, opts) {
  fastify.post('/register', async (request, reply) => {
    const { username, password } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    reply.send(user);
  });

  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;
    const user = await prisma.user.findFirst({
        where: {
          username: username // Assuming 'username' is the field in the database
        }
      });
    if (!user) {
      reply.code(401).send({ message: 'Invalid username or password' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      reply.code(401).send({ message: 'Invalid username or password' });
      return;
    }
    reply.send({ message: 'Login successful' });
  });
  
  // POST endpoint to add an account
  fastify.post('/accounts', async (request, reply) => {
    try {
      const { userId, type } = request.body;

      // Validate request body
      if (!userId || !type) {
        reply.code(400).send({ error: "Missing required fields." });
        return;
      }

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      if (!user) {
        reply.code(404).send({ error: "User not found." });
        return;
      }

      // Create new account
      const account = await prisma.account.create({
        data: {
          userId,
          type
        }
      });

      reply.code(201).send(account);
    } catch (error) {
      reply.code(500).send({ error: "Internal server error." });
    }
  });

  fastify.get('/accounts/:userId', async (request, reply) => {
    const userId = parseInt(request.params.userId);
    const accounts = await prisma.account.findMany({ where: { userId } });
    reply.send(accounts);
  });
};
