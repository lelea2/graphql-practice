'use strict';

import Sequelize from 'sequelize';
import Faker from 'faker';
import _ from 'lodash';
import uuid from 'node-uuid';

const DB_NAME = 'transact_relay';
const MAX_NUM = 10;

const Conn = new Sequelize(
  DB_NAME,
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost'
  }
);

const User = Conn.define('user', {
  id : {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

const Transaction = Conn.define('transaction', {
  id : {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    primaryKey: true
  },
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  streetName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sold_price: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  mls_number: {
    type: Sequelize.STRING,
    allowNull: true
  },
  acceptance_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  contract_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  closing_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  expiration_date: {
    type: Sequelize.DATE,
    allowNull: true
  }
});

//Relationships
User.hasMany(Transaction);
Transaction.belongsTo(User);

Conn.sync({ force: true }).then(() => {
  _.times(MAX_NUM, () => {
    return User.create({
      id: uuid.v1(),
      firstName: Faker.name.firstName(),
      lastName: Faker.name.lastName(),
      email: Faker.internet.email()
    }).then(user => {
      return user.createTransaction({
        id: uuid.v1(),
        streetAddress: Faker.address.streetAddress(),
        streetName: Faker.address.streetName(),
        city: Faker.address.city(),
        state: Faker.address.state(),
        zip: Faker.address.zipCode(),
        price: parseInt(Faker.commerce.price()),
        sold_price: parseInt(Faker.commerce.price())
      });
    });
  });
});

export default Conn;
