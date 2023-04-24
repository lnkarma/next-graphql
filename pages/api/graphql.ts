import { Post, posts } from "@/data/data";
import { Resolvers } from "@/graphql/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import { NextRequest } from "next/server";

const resolvers: Resolvers = {
  Query: {
    hello: () => "world",
    posts: () => posts,
  },

  Mutation: {
    addPost: (_, { title }) => {
      const newPost: Post = {
        id: Math.random().toString(),
        title,
        likes: 0,
      };
      posts.push(newPost);
      return newPost;
    },
  },
};

const typeDefs = readFileSync("./graphql/schema.graphql", {
  encoding: "utf-8",
});

const server = new ApolloServer<{}>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler<NextRequest>(server);
