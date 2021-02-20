const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { typeDefs } = require('./graphql/typeDefs');
const { resolvers } = require('./graphql/resolvers');
const User = require('./db/models/user');
const Database = require('./db/models/database')
const { ApolloServer } = require('apollo-server-express');
const realmApp = new Realm.App({ id: "giraffeql-uzcoz" });

const app = express();

// configure apollo server and pass in database connection
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: {
//     db: { User, Database }
//   }
// });

// Parse json encoded in the request body
app.use(bodyParser.json({ limit: '50mb' }));

// allow cors from all - no hustle and never safe
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    return next();
})

app.use(passport.initialize());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/profile', require('./routes/profile'));


// global error handler --->
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// link apollo server to our express API
// apollo server will be available at /graphql
server.applyMiddleware({ app });

// start server
app.listen(process.env.PORT || 3001, () => console.log("Server listening on http://localhost:3001"))