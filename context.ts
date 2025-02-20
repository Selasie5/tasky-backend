// src/context.ts
import { User } from './models/User';

export interface MyContext {
  user?: User; // The authenticated user (optional)
}