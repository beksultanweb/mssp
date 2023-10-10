import type { GatsbyConfig } from 'gatsby';
require('dotenv').config()

const config: GatsbyConfig = {
  // siteMetadata: {
  //   title: `mssp-global`,
  //   siteUrl: `localhost:3000`
  // },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // graphqlTypegen: true,
  plugins: ['gatsby-plugin-provide-react', {
    resolve: 'gatsby-plugin-sass',
    options: {
      cssLoaderOptions: {
        importLoaders: 2,
        modules: {
          mode: 'local',
          namedExport: false
        }
      },
      sassOptions: {
        includePaths: ['src']
      }
    }
  }, 'gatsby-plugin-image', 'gatsby-transformer-sharp', 'gatsby-plugin-netlify', {
    resolve: 'gatsby-source-wordpress',
      options: {
        url: process.env.GATSBY_WORDPRESS_URL
      }
  }, {
    resolve: 'gatsby-plugin-sharp',
    options: {
      defaults: {
        formats: ['webp'],
        placeholder: 'dominantColor',
        quality: 100,
        breakpoints: [750, 1080, 1366, 1920],
        backgroundColor: 'transparent',
        tracedSVGOptions: {},
        blurredOptions: {},
        jpgOptions: {},
        pngOptions: {},
        webpOptions: {},
        avifOptions: {}
      }
    }
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'pages',
      path: `${__dirname}/src/pages/`
    }
  }, {
    resolve: 'gatsby-plugin-typescript',
    options: {
      isTSX: true,
      jsxPragma: 'jsx',
      allExtensions: true
    }
  }
  ]
};

export default config;
