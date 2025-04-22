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

 type Query
{
tasks: [Task!]!
task(id:ID!):Task
}

 type Mutation
{
createTask(input:TaskInput!):Task!
updateTask(id:ID!, input:TaskInput!):Task!
deleteTask(id:ID!):Boolean!
}
`
