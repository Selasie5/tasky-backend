import * as Sentry from "@sentry/node"
Sentry.init({
    dsn: env.SENTRY_DSN
})
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { typeDefs } from './src/api/typeDefs';
import { resolvers } from './src/api/resolvers';
import { connectDB } from './src/config/database';
import { env } from './src/config/environment';
import { authMiddleware } from './src/middleware/authMiddleware';
import { logger } from './src/utils/logger';
import { MyContext } from './context'; // Import the custom context type
import { IResolvers } from '@graphql-tools/utils'; // Import IResolvers


// Initialize Express app
const app = express();

// Apply middleware
app.use(express.json());
app.use(authMiddleware);

app.get("/debug-sentry",  function mainHandler(req, res){
  res.send ("My first Sentry error")
 } );

Sentry.setupExpressErrorHandler(app);

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
