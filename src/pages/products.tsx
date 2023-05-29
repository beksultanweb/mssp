import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/Layout"


const ProductsPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div>Products</div>
    </Layout>
  )
}

export default ProductsPage