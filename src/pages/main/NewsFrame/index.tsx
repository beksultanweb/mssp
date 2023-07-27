import { Link, graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import styles from './styles.module.scss'

import Arrow from '../../../assets/icons/arrow'
import { SimilarHead } from '../../../components/AdditionalTitle'
import Layout from '../../../components/Layout'
import { NewsBox } from '../../../components/NewsBox'

const query = graphql`
{
    allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "news"}}}}}) {
      edges {
        node {
          news {
            newsImg {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 387, height: 299, formats: WEBP)
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
            <NewsBox data={news.slice(0, 2)}/>
            <Link to={'/news'}><button className={styles.btn}>Все новости<Arrow theme="dark"/></button></Link>
        </Layout>
    )
}

export default NewsFrame