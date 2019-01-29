import { GraphQLServer } from 'graphql-yoga'

const server = new GraphQLServer({
  typeDefs: './schema/schema.graphql'
})

server.start(() => console.log("Graphql Server Running"))