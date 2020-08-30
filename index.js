const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const schema = buildSchema(`
type Query {
    obj(name: String): Character
},
type Character {
    id: Int
    name: String
    age: Int
},
`);
const objData = [
  { id: 1, name: "Blue", age: 24 },
  { id: 2, name: "Pink", age: 25 },
];
const root = {
  obj: (args) => {
    const name = args.name;
    return objData.filter((val) => val.name == name);
  },
};
const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(5000);
console.log("Run on Port 5000");
