import React from "react"
import Layout from "../../../components/Layout"
import styles from "./styles.module.scss"
import Arrow from "../../../assets/icons/arrow"
import newsImg from "../../../assets/images/cybernomads.jpg"

export const NewsFrame = () => {
    return (
        <Layout>
            <div className={styles.head}>
                <div>
                    <span>/007</span>
                    <h2 className={styles.title}>Новости</h2>
                </div>
                <button>Все новости<Arrow/></button>
            </div>
            <div className={styles.news}>
                <div className={styles.news__item}>
                    <img className={styles.news__img} src={newsImg} alt="" />
                    <div className={styles.news__title}>Мадяр Мухамадиев первый в Казахстане получил сертификат eCTHP v2</div>
                </div>
                <div className={styles.news__item}>
                    <img className={styles.news__img} src={newsImg} alt="" />
                    <div className={styles.news__title}>Мадяр Мухамадиев первый в Казахстане получил сертификат eCTHP v2</div>
                </div>
                <div className={styles.news__item}>
                    <img className={styles.news__img} src={newsImg} alt="" />
                    <div className={styles.news__title}>Мадяр Мухамадиев первый в Казахстане получил сертификат eCTHP v2</div>
                </div>
            </div>
        </Layout>
    )
}