import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./graphql/schema.graphql",
  documents: "**/*.tsx",
  generates: {
    "graphql/client/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
