const { ApolloServer } = require("apollo-server");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
  {
    id: "link-1",
    url: "www.indexone.com",
    description: "Item indexed one",
  },
  {
    id: "link-2",
    url: "www.indextwo.com",
    description: "Item index 2",
  },
];
/*
You’re adding a new integer variable that simply 
serves as a very rudimentary(thô sơ) way to generate unique IDs 
for newly created Link elements.
*/
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {
    /*
The implementation of the post resolver first creates a new link object, 
then adds it to the existing links list and finally returns the new link.
*/
    post: (parent, args) => {
      // args carries the arguments for the operation –
      // in this case the url and description of the Link to be created.
      let idCount = links.length;
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let targetIndex = links.findIndex((x) => x.id == args.id);
      if (targetIndex) {
        if (args.url) {
          links[targetIndex].url = args.url;
        }
        if (args.description) {
          links[targetIndex].description = args.description;
        }

        return links[targetIndex];
      }
    },
    deleteLink: (parent, args) => {
      let targetIndex = links.findIndex((x) => x.id == args.id);
      links[targetIndex].url = ""
      links[targetIndex].description = ""
      return links[targetIndex]
    }
  },
};

const fs = require("fs");
const { argsToArgsConfig } = require("graphql/type/definition");
const path = require("path");

// 3
const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
