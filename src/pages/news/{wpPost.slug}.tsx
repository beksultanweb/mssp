import React from "react"
import { graphql } from "gatsby"
import { Header } from "../../components/Header"
import { Footer } from "../../components/Footer"
import styles from "./styles.module.scss"
import Layout from "../../components/Layout"
import { SimilarHead } from "../../components/AdditionalTitle"
import { NewsBox } from "../../components/NewsBox"
import Arrow from "../../assets/icons/arrow"

export const query = graphql`
query MyQuery($title: String) {
    allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "news"}}}}, title: {ne: $title}}) {
      edges {
        node {
          title
          slug
          news {
            newsImg {
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 387, height: 299, formats: WEBP, placeholder: DOMINANT_COLOR)
                }
              }
            }
          }
        }
      }
    }
    wpPost(title: {eq: $title}) {
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
          sourceUrl
        }
        newsReadTime
        newsSubtitle
      }
      date(formatString: "DD MMMM YYYY", locale: "ru")
      content
    }
  }
`

interface ProductPageProps {
    data: {
      allWpPost: {
        edges: {
          node: {
            title: string
            slug: string
            news: {
              newsImg: {
                localFile: string
              }
            }
          }
        }[]
      }
        wpPost: {
            author: {
                node: {
                  avatar: {
                    url: string
                  }
                  lastName: string
                  firstName: string
                }
              }
              news: {
                newsImg: {
                  sourceUrl: string
                }
                newsReadTime: string
                newsSubtitle: string
              }
              date: string
            title: string
            content: string
        }
    }
}

const NewsItem = ({data}: ProductPageProps) => {
    const {title, date, news, author, content} = data.wpPost
    const newsData = data.allWpPost.edges.map((edge: any) => edge.node)
    return (
        <section className={styles.news}>
            <Header theme="light"/>
            <Layout>
                <h1 className={styles.simple__title}>{title}</h1>
                <div className={`${styles.news__addinfo} ${styles.centered}`}>
                    <div className={styles.news__author}>
                        <img src={author.node.avatar.url} className={styles.news__author_img}/>
                        <div className={styles.news__author_name}>{author.node.firstName} {author.node.lastName}</div>
                    </div>
                    <div className={styles.news__circle}></div>
                    <div className={styles.news__date}>{date}</div>
                    <div className={`${styles.news__circle} ${styles.link}`}></div>
                    <div className={styles.news__date}>{news.newsReadTime}</div>
                </div>
                <img src={news.newsImg.sourceUrl} className={styles.main__img} alt="" />
                <div className={styles.content} dangerouslySetInnerHTML={{__html: content}}></div>
                <SimilarHead theme="light" title="Похожие новости" buttonTxt="Все новости"/>
                <NewsBox data={newsData}/>
                <button className={styles.btn}>Все новости<Arrow theme="light"/></button>
            </Layout>
            <Footer/>
        </section>
    )
}

export default NewsItem