import {mergeTypeDefs} from '@graphql-tools/merge';

import { authType } from './authType';
import { userType } from './userType';
import { taskType } from './taskType';

export const typeDefs = mergeTypeDefs([authType, userType, taskType]);