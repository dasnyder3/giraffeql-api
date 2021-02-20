const resolvers = {
  Query: {
    users: async (_parent, _args, context) => {
      try {
        const users = await context.db.User.find({}, {oAuthId: 1});
        return users;
      } catch(err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    createDatabase: async (_parent, args, context) => {
      try {
        const newDb = await context.db.Database.create(JSON.parse(args));
        return newDb;
      } catch(err) {
        throw new Error(err)
      }
    }
  }
}

module.exports = { resolvers };