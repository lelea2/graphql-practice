'use strict';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';
import uuid from 'node-uuid';
import Faker from 'faker';

import Db from './db';

const Transaction = new GraphQLObjectType({
  name: 'Transaction',
  description: 'Transaction',
  fields () {
    return {
      id: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.id;
        }
      },
      address: {
        type: GraphQLString,
        resolve (transaction) {
          return `${transaction.streetAddress}, ${transaction.streetName}`;
        }
      },
      city: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.content;
        }
      },
      state: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.state;
        }
      },
      zip: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.zip;
        }
      },
      price: {
        type: GraphQLInt,
        resolve (transaction) {
          return transaction.price;
        }
      },
      sold_price: {
        type: GraphQLInt,
        resolve (transaction) {
          return transaction.sold_price;
        }
      },
      mls_number: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.mls_number;
        }
      },
      expiration_date: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.expiration_date;
        }
      },
      acceptance_date: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.acceptance_date;
        }
      },
      contract_date: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.contract_date;
        }
      },
      closing_date: {
        type: GraphQLString,
        resolve (transaction) {
          return transaction.closing_date;
        }
      },
      creator_id: {
        type: User,
        resolve (transaction) {
          return transaction.getUser();
        }
      }
    };
  }
});

const User = new GraphQLObjectType({
  name: 'User',
  description: 'This represents a User',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve (user) {
          return user.id;
        }
      },
      firstName: {
        type: GraphQLString,
        resolve (user) {
          return user.firstName;
        }
      },
      lastName: {
        type: GraphQLString,
        resolve (user) {
          return user.lastName;
        }
      },
      email: {
        type: GraphQLString,
        resolve (user) {
          return user.email;
        }
      },
      transactions: {
        type: new GraphQLList(Transaction),
        resolve (user) {
          return user.getTransactions();
        }
      }
    };
  }
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'Root query object',
  fields: () => {
    return {
      user: {
        type: new GraphQLList(User),
        args: {
          id: {
            type: GraphQLString
          },
          email: {
            type: GraphQLString
          }
        },
        resolve (root, args) {
          return Db.models.user.findAll({ where: args });
        }
      },
      transaction: {
        type: new GraphQLList(Transaction),
        resolve (root, args) {
          return Db.models.transaction.findAll({ where: args });
        }
      }
    };
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutations',
  description: 'Functions to set stuff',
  fields () {
    return {
      addUser: {
        type: User,
        args: {
          firstName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          lastName: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve (source, args) {
          return Db.models.user.create({
            id: uuid.v1(),
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email.toLowerCase()
          });
        }
      },
      addTransaction: {
        type: Transaction,
        args: {
          userId: {
            type: new GraphQLNonNull(GraphQLString)
          },
          streetAddress: {
            type: new GraphQLNonNull(GraphQLString)
          },
          streetName: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve (source, args) {
          return Db.models.transaction.create({
            id: uuid.v1(),
            streetAddress: args.streetAddress,
            streetName: args.streetName,
            city: Faker.address.city(),
            state: Faker.address.state(),
            zip: Faker.address.zipCode(),
            price: parseInt(Faker.commerce.price()),
            sold_price: parseInt(Faker.commerce.price()),
            userId: args.userId
          });
        }
      }
    };
  }
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

export default Schema;
