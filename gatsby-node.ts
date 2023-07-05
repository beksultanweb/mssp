// import type { GatsbyNode } from "gatsby"
// import path from "path"
// import slugify from "slugify"

// interface productsProps {
//     allWpPost: {
//         edges: {
//             node: {
//                 title: string
//                 slug: string
//             }
//         }[]
//     }
// }

// const createPages: GatsbyNode["createPages"] = async ({
//     graphql,
//     actions
//   }) => {
//     const { createPage } = actions
//     const allProducts: {
//         errors?: any
//         data?: productsProps
//     } = await graphql(`
//     query Products {
//         allWpPost(
//             filter: {categories: {nodes: {elemMatch: {slug: {nin: ["news", "uncategorized", "mssp-services"]}}}}}
//           ) {
//             edges {
//               node {
//                 title
//                 slug
//               }
//             }
//           }
//     }`)


//     allProducts.data?.allWpPost.edges.forEach(edge => {
//         createPage({
//             path: '/products/' + edge.node.slug,
//             component: path.resolve('./src/templates/product-details.tsx'),
//             context: {title: edge.node.title, slug: edge.node.slug}
//         })
//     })
//   }

// export default createPages