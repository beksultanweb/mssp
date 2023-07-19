import { Link, PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'



const News: React.FC<PageProps> = ({ pageContext }) => {
    const { news } = pageContext
    const newsData = news.data.allWpPost.nodes
    const [sliceNum, setSliceNum] = useState(3)
    const handleOpenMore = () => {
      setSliceNum(sliceNum * 2)
    }

    const arrayImage = newsData.map(post => getImage(post.news.newsImg))

    return (
        <section className={styles.news}>
            <Header theme="light"/>
            <Layout>
                <h1 className={styles.title}>Новости</h1>
                <GatsbyImage image={arrayImage[0]} className={styles.main__img} alt="" />
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
                {newsData.slice(1, sliceNum).map((post: any, index: number) =>
                  <div key={post.title} className={styles.news__box}>
                      <GatsbyImage image={arrayImage[index]} className={styles.news__img} alt="news" />
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