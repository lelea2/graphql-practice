'use strict';

import Express from 'express';
import GraphHTTP from 'express-graphql';
import Schema from './schema';

// Start
const app = Express();
const port = process.env.PORT || 8000;

// GraphQL
app.use('/graphql', GraphHTTP({
  schema: Schema,
  pretty: true,
  graphiql: true
}));

app.listen(port, ()=> {
  console.log(`App listening on port ${port}`);
});
