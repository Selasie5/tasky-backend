export const authType = `
type AuthPayload{
token: String!
user: User!
}

type Mutation{
login(email:String!, password:String!):AuthPayload
register(name:String!, email:String!, password:String!):AuthPayload
}
`;
