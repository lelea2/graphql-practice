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
  people {
    id
  }
}

{
  post {
    id,
    title,
    content
  }
}

{
  posts {
    title,
    person {
      firstName,
      posts {
        content
      }
    }
  }
}

mutation addPerson {
  addPerson(firstName: "Khanh", lastName: "Dao", email: "ktest@test.com") {
    id,
    email
  }
}

```

