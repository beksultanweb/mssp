import React from "react"
import { INews } from "../../types/INews"
import styles from "./styles.module.scss"
import {Link} from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const NewsBox = ({data}: {data: INews[]}) => {
    return (
        <div className={styles.news}>
            {data.map((post) => {
                const image = getImage(post.news.newsImg.localFile)
                return (
                    <Link key={post.title} to={`/news/${post.slug}`} className={styles.news__item}>
                        {image && <GatsbyImage className={styles.news__img} image={image} alt="" />}
                        <div className={styles.news__title}>{post.title}</div>
                    </Link>
                )
            })}
        </div>
    )
}