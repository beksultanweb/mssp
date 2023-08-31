import { GatsbyNode } from 'gatsby';
import { CreatePageArgs } from 'gatsby';

import path from 'path';

export const createPages: GatsbyNode['createPages'] = async ({
  page,
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
        allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {nin: ["news", "uncategorized"]}}}}}) {
            nodes {
              slug
              title
              ServiceInformation {
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
                  slug
                }
              }
              content
            }
          }
    }
  `);

  const sameNews = await graphql(`query MyQuery {
    allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "news"}}}}}) {
      edges {
        node {
          title
          slug
          news {
            newsImg {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 387, height: 299, formats: WEBP)
                }
              }
            }
          }
        }
      }
    }
  }`)

  const productTemplate = path.join(__dirname, '/src/templates/product/product.tsx');
  const newsTemplate = path.join(__dirname, '/src/templates/news/news.tsx');
  const allNewsTemplate = path.join(__dirname, '/src/templates/news/index.tsx');

  news.data.allWpPost.nodes.forEach((node: any) => {
    createPage({
      path: `/news/${node.slug}`,
      component: newsTemplate,
      context: {
        currNews: node,
        sameNews: sameNews
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

  const newsPosts = news.data.allWpPost.nodes
  const postsPerPage = 5
  const numPages = Math.ceil(newsPosts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/news' : `/news/${i + 1}`,
      component: allNewsTemplate,
      context: {
        newsPosts,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1
      }
    })
  })
};
