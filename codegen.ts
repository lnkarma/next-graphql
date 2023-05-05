import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/schema.graphql",
  generates: {
    "graphql/server.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-document-nodes",
      ],
    },
    "graphql/client/": {
      documents: "**/*.tsx",
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
