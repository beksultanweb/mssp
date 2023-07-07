import React, { useState } from "react"
import styles from "./styles.module.scss"
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import { Footer } from "../../components/Footer"
import { Link, graphql } from "gatsby"
import Arrow from "../../assets/icons/arrow"

export const query = graphql`query MyQuery {
    allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "news"}}}}}) {
      edges {
        node {
          author {
            node {
              avatar {
                url
              }
              lastName
              firstName
            }
          }
          title
          slug
          news {
            newsImg {
              sourceUrl
            }
            newsReadTime
            newsSubtitle
          }
          date(formatString: "DD MMMM YYYY", locale: "ru")
        }
      }
    }
  }`

interface dataProps {
  data: {
    allWpPost: {
      edges: {
        node: {
            author: {
              node: {
                avatar: {
                  url: string
                }
                lastName: string
                firstName: string
              }
            }
            title: string
            slug: string
            news: {
            newsImg: {
                sourceUrl: string
            }
            newsReadTime: string
            newsSubtitle: string
            }
            date: string
        }
      }[]
    }
  }
}

const News: React.FC<dataProps> = ({ data }) => {
    const newsData = data.allWpPost.edges.map(edge => edge.node)
    const [sliceNum, setSliceNum] = useState(3)
    const handleOpenMore = () => {
      setSliceNum(sliceNum * 2)
    }

    return (
        <section className={styles.news}>
            <Header theme="light"/>
            <Layout>
                <h1 className={styles.title}>Новости</h1>
                <img src={newsData[0].news.newsImg.sourceUrl} className={styles.main__img} alt="" />
                <div className={styles.news__info}>
                  <div>
                    <Link className={styles.a_link} to={`/news/${newsData[0].slug}`}><h3 className={styles.news__title}>{newsData[0].title}</h3></Link>
                    <p className={styles.news__subtitle}>{newsData[0].news.newsSubtitle}</p>
                  </div>
                  <div className={styles.news__addinfo}>
                    <div className={styles.news__author}>
                      <img src={newsData[0].author.node.avatar.url} className={styles.news__author_img}/>
                      <div className={styles.news__author_name}>{newsData[0].author.node.firstName} {newsData[0].author.node.lastName}</div>
                    </div>
                    <div className={styles.news__circle}></div>
                    <div className={styles.news__date}>{newsData[0].date}</div>
                  </div>
                </div>
                {newsData.slice(1, sliceNum).map((post: any) =>
                  <div key={post.title} className={styles.news__box}>
                      <img src={post.news.newsImg.sourceUrl} className={styles.news__img} alt="news" />
                      <div>
                        <h3 className={styles.news__title}>{post.title}</h3>
                        <p className={`${styles.news__subtitle} ${styles.news__subtitle_margin}`}>{post.news.newsSubtitle}</p>
                        <div className={styles.news__addinfo}>
                          <div className={styles.news__author}>
                            <img src={post.author.node.avatar.url} className={styles.news__author_img}/>
                            <div className={styles.news__author_name}>{post.author.node.firstName} {newsData[0].author.node.lastName}</div>
                          </div>
                          <div className={styles.news__circle}></div>
                          <div className={styles.news__date}>{post.date}</div>
                        </div>
                      </div>
                      <Link className={styles.link} to={`/news/${post.slug}`}><Arrow theme="dark" className={styles.news__link} rotate={45}/></Link>
                  </div>
                )}
                <button onClick={handleOpenMore} className={styles.news__more}>Еще новости<Arrow theme="dark" rotate={135}/></button>
            </Layout>
            <Footer theme="light"/>
        </section>
    )
}

export default News