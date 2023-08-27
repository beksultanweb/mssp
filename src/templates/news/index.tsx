import { Link, PageProps, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'



const News: React.FC<PageProps> = ({ pageContext, data }) => {
    const { numPages, currentPage } = pageContext
    const newsPosts = data.allWpPost.nodes

    const isFirst = currentPage === 1
    const isLast = currentPage === numPages
    const prevPage = currentPage - 1 === 1 ? '/news' : (currentPage - 1).toString()
    const nextPage = (currentPage + 1).toString()

    const arrayImage = newsPosts.map(post => getImage(post.news.newsImg))

    return (
        <section className={styles.news}>
            <Header theme="light"/>
            <Layout>
                <h1 className={styles.title}>Новости</h1>
                <Link className={styles.a_link} to={`/news/${newsPosts[0].slug}`}><GatsbyImage image={arrayImage[0]} className={styles.main__img} imgStyle={{ borderRadius: '12px' }} alt="" /></Link>
                <div className={styles.news__info}>
                  <div>
                    <Link className={styles.a_link} to={`/news/${newsPosts[0].slug}`}><h3 className={styles.news__title}>{newsPosts[0].title}</h3></Link>
                    <p className={styles.news__subtitle}>{newsPosts[0].news.newsSubtitle}</p>
                  </div>
                  <div className={styles.news__addinfo}>
                    <div className={styles.news__author}>
                      <img src={newsPosts[0].author.node.avatar.url} className={styles.news__author_img}/>
                      <div className={styles.news__author_name}>{newsPosts[0].author.node.firstName} {newsPosts[0].author.node.lastName}</div>
                    </div>
                    <div className={styles.news__circle}></div>
                    <div className={styles.news__date}>{newsPosts[0].date}</div>
                  </div>
                </div>
                {newsPosts.slice(1, newsPosts.length).map((post: any, index: number) =>
                  <div key={post.title} className={styles.news__box}>
                      <Link className={styles.a_link} to={`/news/${post.slug}`}><GatsbyImage image={arrayImage[index]} className={styles.news__img} imgStyle={{ borderRadius: '12px' }} alt="news" /></Link>
                      <div>
                        <Link className={styles.a_link} to={`/news/${post.slug}`}><h3 className={styles.news__title}>{post.title}</h3></Link>
                        <p className={`${styles.news__subtitle} ${styles.news__subtitle_margin}`}>{post.news.newsSubtitle}</p>
                        <div className={styles.news__addinfo}>
                          <div className={styles.news__author}>
                            <img src={post.author.node.avatar.url} className={styles.news__author_img}/>
                            <div className={styles.news__author_name}>{post.author.node.firstName} {newsPosts[0].author.node.lastName}</div>
                          </div>
                          <div className={styles.news__circle}></div>
                          <div className={styles.news__date}>{post.date}</div>
                        </div>
                      </div>
                      <Link className={styles.link} to={`/news/${post.slug}`}><Arrow theme="dark" className={styles.news__link} rotate={45}/></Link>
                  </div>
                )}
                <ul
          className={styles.pagination}
        >
          {!isFirst && (
            <Link to={prevPage} rel="prev">
              &lt;
            </Link>
          )}
          {Array.from({ length: numPages }, (_, i) => (
            <li
              key={`pagination-number${i + 1}`}
              className={styles.pagination__number}
            >
              <Link
                to={`/news/${i === 0 ? '' : i + 1}`}
                className={`${i + 1 === currentPage ? styles.pagination__number_active : ''}`}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          {!isLast && (
            <Link to={`/news/${nextPage}`} rel="next">
              &gt;
            </Link>
          )}
        </ul>
            </Layout>
            <Footer theme="light"/>
        </section>
    )
}

export default News


export const pageQuery = graphql`
    query AllWpNews($skip: Int!, $limit: Int!) {
        allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "news"}}}}}
        limit: $limit
        skip: $skip) {
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
  `