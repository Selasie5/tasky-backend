export const taskType = `
type Task {
id:ID!,
title:String!,
description:String,
status:String!,
deadline:String!
createdAt:String!
updatedAt:String!
}

input TaskInput{
title:String!,
description:String,
status:String!,
deadline:String!
}

extend type Query
{
tasks: [Task!]!
task(id:ID!):Task
}

extend type Mutation
{
createTask(input:TaskInput!):Task!
updatedTask(id:ID!, input:TaskInput!):Task!
deleteTask(id:ID!):Boolean!
}
`