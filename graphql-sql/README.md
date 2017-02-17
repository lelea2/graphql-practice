### GraphQL - SQL

GraphQL with SQL Database (Postgres): Query and mutation in graphQL

```
//Run DB
./node_modules/.bin/babel-node db.js

//Run app
./run.sh

```


* Query

```
{
  user {
    id,
    firstName,
    lastName,
    email
  }
}

{
  transaction {
    id,
    address,
    zip,
    state,
    price,
    sold_price
  }
}

{
  user {
    id,
    transactions {
      id,
      address
    }
  }
}

mutation addUser {
  addUser(firstName: "Khanh", lastName: "Dao", email: "ktest@test.com") {
    id,
    email
  }
}

mutation addTransaction {
  addTransaction(userId: "dc1fbe80-f4d8-11e6-acb5-d1f39e1f0493", streetAddress: "1234A", streetName: "Main St") {
    id
  }
}

```

