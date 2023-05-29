// import type { GatsbyNode } from "gatsby"
// import path from "path"

// const onCreateWebpackConfig: GatsbyNode["onCreateBabelConfig"] = ({
//     stage,
//     rules,
//     loaders,
//     plugins,
//     actions,
//   }) => {
//     actions.setWebpackConfig({
//         resolve: {
//             modules: [path.resolve(__dirname, "src"), "node_modules"],
//             },
//       module: {
//         rules: [
//           {
//             test: /\.scss$/,
//             use: [
//               `sass-loader`,
//             ],
//           },
//         ],
//       }
//     })
//   }

//   export default onCreateWebpackConfig