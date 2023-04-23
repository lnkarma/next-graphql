import { Post, posts } from "@/data/data";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

const resolvers = {
  Query: {
    hello: () => "world",
    posts: () => posts,
  },

  Mutation: {
    addPost: (_: any, { title }: { title: string }) => {
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

const typeDefs = gql`
  type Post {
    id: String
    title: String
    likes: Int
  }

  type Query {
    hello: String
    posts: [Post]
  }

  type Mutation {
    addPost(title: String!): Post
  }

  mutation AddPost($title: String!) {
    addPost(title: $title) {
      id
      title
    }
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler<NextRequest>(server);
