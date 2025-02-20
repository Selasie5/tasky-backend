export const authType = `
type AuthPayload{
token: String!
user: User!
}

extend type Mutation{
login(email:String!, pasword:String!):AuthPayload
register(name:String!, email:String!, password:String!):AuthPayload
}
`;