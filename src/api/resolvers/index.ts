// src/api/resolvers/index.ts
import { mergeResolvers } from '@graphql-tools/merge';
import { authResolver } from './authResolver';
import { taskResolver } from './taskResolver';
import { userResolver } from './userResolver';

export const resolvers = mergeResolvers([authResolver, taskResolver, userResolver]);