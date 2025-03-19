import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { connectDB } from '../config/database';
import { env } from '../config/environment';
import { authMiddleware } from '../middleware/authMiddleware';
import { logger } from '../utils/logger';
import { MyContext } from '../../context'; // Import the custom context type
import { IResolvers } from '@graphql-tools/utils'; // Import IResolvers

// Initialize Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(authMiddleware);

// Apollo Server setup
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers: resolvers as IResolvers<any, MyContext>,
});

// Start function
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start Apollo Server
    await server.start();

    // Apply Apollo Server middleware
    app.use(
      '/graphql',
      cors<cors.CorsRequest>(), // Enable CORS
      bodyParser.json(), // Parse JSON request bodies
      // @ts-ignore
      expressMiddleware(server, {
        context: async ({ req }) => ({ user: req.user }), // Add user to context
      }),
    );

    // Start Express server
    app.listen({ port: env.PORT }, () => {
      logger.info(`Server running at http://localhost:${env.PORT}`);
      logger.info(`GraphQL endpoint: http://localhost:${env.PORT}/graphql`);
    });
  } catch (error: any) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
