import { userService } from '../../services/userService';

export const userResolver = {
  Query: {
    me: async (_:any, __:any, { user }: {user:any}) => {
      return await userService.getUserById(user.id);
    },
  },
};