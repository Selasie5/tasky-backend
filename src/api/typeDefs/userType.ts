export const userType = `
  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  extend type Query {
    me: User
  }
`;