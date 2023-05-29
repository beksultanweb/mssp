import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `mssp-global`,
    siteUrl: `localhost:3000`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-plugin-sitemap", {
    resolve: `gatsby-plugin-typescript`,
    options: {
      isTSX: true, // defaults to false
      jsxPragma: `jsx`, // defaults to "React"
      allExtensions: true, // defaults to false
    },
  }, {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          includePaths: ['src'],
        },
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false
          }
        },
      },
    },
  ]
};

export default config;
