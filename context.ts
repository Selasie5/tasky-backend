// src/context.ts
import { User } from "./src/models/User";

export interface MyContext {
  user?: typeof User; // The authenticated user (optional)
}
