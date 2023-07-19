import { graphql, useStaticQuery, PageProps } from 'gatsby'
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image'
import React from 'react'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import { SimilarHead } from '../../components/AdditionalTitle'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'

import Layout from '../../components/Layout'
import { NewsBox } from '../../components/NewsBox'




const NewsItem = ({ pageContext }: PageProps) => {
    const { currNews, sameNews } = pageContext
    const { title, date, author, content, news } = currNews
    const newsData = sameNews.data.allWpPost.edges.map((edge: any) => edge.node)
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
                <GatsbyImage image={getImage(news.newsImg)} className={styles.main__img} alt="" />
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }}></div>
                <SimilarHead theme="light" title="Похожие новости" buttonTxt="Все новости"/>
                <NewsBox data={newsData.slice(0, 3)}/>
                <button className={styles.btn}>Все новости<Arrow theme="light"/></button>
            </Layout>
            <Footer/>
        </section>
    )
}

export default NewsItem