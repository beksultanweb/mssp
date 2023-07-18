import { GatsbyNode } from 'gatsby';
import { CreatePageArgs } from 'gatsby';

import path from 'path';

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions
}: CreatePageArgs) => {
  const { createPage } = actions;
  const news = await graphql(`
    query AllWpNews {
        allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "news"}}}}}) {
            nodes {
              slug
              title
              author {
                node {
                  avatar {
                    url
                  }
                  lastName
                  firstName
                }
              }
              news {
                newsImg {
                  gatsbyImage(width: 1000, formats: WEBP)
                }
                newsReadTime
                newsSubtitle
              }
              date(formatString: "DD MMMM YYYY", locale: "ru")
              content
            }
          }
    }
  `);
  const products = await graphql(`
    query AllWpProducts {
        allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {nin: ["news", "uncategorized", "mssp-services"]}}}}}) {
            nodes {
              slug
              title
              ServiceInformation {
                yearOfProduction
                iconAdvantage1 {
                  sourceUrl
                }
                iconAdvantage2 {
                  sourceUrl
                }
                iconAdvantage3 {
                  sourceUrl
                }
                advantage1
                advantage2
                advantage3
                presentation {
                  mediaItemUrl
                }
                deadlines
              }
              categories {
                nodes {
                  name
                }
              }
              content
            }
          }
    }
  `);

  const productTemplate = path.join(__dirname, '/src/templates/product/product.tsx');
  const newsTemplate = path.join(__dirname, '/src/templates/news/news.tsx');
  news.data.allWpPost.nodes.forEach((node: any) => {
    createPage({
      path: `/news/${node.slug}`,
      component: newsTemplate,
      context: {
        currNews: node
      }
    });
  });
  products.data.allWpPost.nodes.forEach((node: any) => {
    createPage({
      path: `/products/${node.slug}`,
      component: productTemplate,
      context: {
        product: node
      }
    });
  });
};
