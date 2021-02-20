const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    oAuthId: Int!
  }

  type Column {
    name: String!
    dataType: String!
    required: Boolean
    primaryKey: Boolean
  }

  type Connection {
    originKey: String
    destinationTable: String
    destinationKey: String  
  }

  type Table {
    name: String
    columns: [Column]
    connections: [Connection]
  }

  type Database {
    userId: ID!,
    tables: [Table]
  }

  type Query {
    users: [User]!
  }

  input ColumnInput {
    name: String
    dataType: String
    required: Boolean
    primaryKey: Boolean
  }

  input ConnectionInput {
    originKey: String
    destinationTable: String
    destinationKey: String
  }

  input TableInput {
    name: String
    columns: [ColumnInput]
    connections: [ConnectionInput]
  }

  type Mutation {
    createDatabase(
      userID: ID!, 
      tables: [TableInput!] 
    ): Database!
  }
`;

module.exports = { typeDefs };