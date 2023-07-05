import React from "react"
import Layout from "../../../components/Layout"
import styles from "./styles.module.scss"
import Arrow from "../../../assets/icons/arrow"
import {graphql, useStaticQuery} from "gatsby"
import { NewsBox } from "../../../components/NewsBox"
import { SimilarHead } from "../../../components/AdditionalTitle"

const query = graphql`
{
    allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "news"}}}}}) {
      edges {
        node {
          news {
            newsImg {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 387, height: 299, formats: WEBP, placeholder: DOMINANT_COLOR)
                }
              }
            }
          }
          title
          slug
        }
      }
    }
  }`

const NewsFrame = () => {
    const data = useStaticQuery(query)
    const news = data.allWpPost.edges.map((edge: any) => edge.node)

    return (
        <Layout>
            <SimilarHead title="Новости" order="/007" buttonTxt="Все новости" theme="dark"/>
            <NewsBox data={news}/>
            <button className={styles.btn}>Все новости<Arrow theme="dark"/></button>
        </Layout>
    )
}

export default NewsFrame