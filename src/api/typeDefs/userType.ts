export const userType = `
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

   type Query {
    me: User
  }
`;
