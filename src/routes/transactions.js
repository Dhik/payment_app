// src/routes/transactions.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async function (fastify, opts) {
  // POST endpoint to send transaction
  fastify.post('/send', async (request, reply) => {
    try {
      const { accountId, amount, toAddress } = request.body;

      // Validate request body
      if (!accountId || !amount || !toAddress) {
        reply.code(400).send({ error: "Missing required fields." });
        return;
      }

      // Fetch user's account
      const account = await prisma.account.findFirst({
        where: { id: accountId }
      });

      // Check if account exists
      if (!account) {
        reply.code(404).send({ error: "Account not found." });
        return;
      }

      // Process transaction
      const transaction = await prisma.transaction.create({
        data: {
          accountId,
          amount,
          toAddress,
          currency: "dollar",
          status: "pending" // Assuming initial status is pending
        }
      });

      // Call transaction processing function
      await processTransaction(transaction);

      // Update transaction status after processing
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: "completed" }
      });

      reply.code(200).send({ message: "Transaction sent successfully." });
    } catch (error) {
      reply.code(500).send({ error: "Internal server error." });
    }
  });

  // POST endpoint to withdraw from account
  fastify.post('/withdraw', async (request, reply) => {
    try {
      const { accountId, amount } = request.body;

      // Validate request body
      if (!accountId || !amount) {
        reply.code(400).send({ error: "Missing required fields." });
        return;
      }

      // Fetch user's account
      const account = await prisma.account.findUnique({
        where: { id: accountId }
      });

      // Check if account exists
      if (!account) {
        reply.code(404).send({ error: "Account not found." });
        return;
      }

      // Process withdrawal (assuming withdrawal is just sending to another address)
      const transaction = await prisma.transaction.create({
        data: {
          accountId,
          amount: -amount, // Withdrawal is represented as negative amount
          currency: "dollar",
          toAddress: "withdrawal", // Placeholder for withdrawal
          status: "pending" // Assuming initial status is pending
        }
      });

      // Call transaction processing function
      await processTransaction(transaction);

      // Update transaction status after processing
      await prisma.transaction.update({
        where: { id: transaction.id },
        data: { status: "completed" }
      });

      reply.code(200).send({ message: "Withdrawal processed successfully." });
    } catch (error) {
      reply.code(500).send({ error: "Internal server error." });
    }
  });

  // GET endpoint to retrieve transactions for an account
  fastify.get('/transactions/:accountId', async (request, reply) => {
    try {
      const accountId = parseInt(request.params.accountId);

      // Fetch transactions for the account
      const transactions = await prisma.transaction.findMany({
        where: { accountId },
        orderBy: { timestamp: 'desc' },
      });

      reply.code(200).send(transactions);
    } catch (error) {
      reply.code(500).send({ error: "Internal server error." });
    }
  });
};

// Function to process transaction (same as provided)
function processTransaction(transaction) {
  return new Promise((resolve, reject) => {
      console.log('Transaction processing started for:', transaction);

      // Simulate long running process
      setTimeout(() => {
          // After 30 seconds, we assume the transaction is processed successfully
          console.log('transaction processed for:', transaction);
          resolve(transaction);
      }, 30000); // 30 seconds
  });
}
