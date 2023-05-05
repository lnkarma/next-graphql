import { posts } from "@/data/data";
import { Post, Resolvers, User } from "@/graphql/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { readFileSync } from "fs";
import { NextRequest } from "next/server";
import { GraphQLError } from "graphql";

type ContextType = {
  user: User;
};

const resolvers: Resolvers<ContextType> = {
  Query: {
    hello: () => "world",
    posts: () => {
      console.log(JSON.stringify(posts));
      return posts;
    },
  },

  Mutation: {
    addPost: (_, { title }, context) => {
      const newPost: Post = {
        id: Math.random().toString(),
        title,
        likes: 0,
        author: context.user,
      };
      posts.push(newPost);
      return newPost;
    },
  },
};

const typeDefs = readFileSync("./graphql/schema.graphql", {
  encoding: "utf-8",
});

const server = new ApolloServer<ContextType>({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler<NextRequest, ContextType>(
  server,
  {
    context: async (req) => {
      if (true)
        // throwing a `GraphQLError` here allows us to specify an HTTP status code,
        // standard `Error`s will have a 500 status code by default
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });

      return {
        user: {
          id: "123",
          name: "test user",
        },
      };
    },
  },
);
