import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  // siteMetadata: {
  //   title: `mssp-global`,
  //   siteUrl: `localhost:3000`
  // },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // graphqlTypegen: true,
  plugins: [{
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
  }, "gatsby-plugin-image", "gatsby-transformer-sharp", {
    resolve: `gatsby-source-wordpress`,
      options: {
        url:
          process.env.WPGRAPHQL_URL ||
          `http://localhost/wp/graphql`,
      },
  }, {
    resolve: `gatsby-plugin-sharp`,
    options: {
      defaults: {
        formats: [`webp`],
        placeholder: `dominantColor`,
        quality: 50,
        breakpoints: [750, 1080, 1366, 1920],
        backgroundColor: `transparent`,
        tracedSVGOptions: {},
        blurredOptions: {},
        jpgOptions: {},
        pngOptions: {},
        webpOptions: {},
        avifOptions: {},
      }
    }
  }, {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: `${__dirname}/src/pages/`,
    },
  }, {
    resolve: `gatsby-plugin-typescript`,
    options: {
      isTSX: true, // defaults to false
      jsxPragma: `jsx`, // defaults to "React"
      allExtensions: true, // defaults to false
    },
  },
  ]
};

export default config;
