import React from "react"
import Layout from "../../../components/Layout"
import img from "../../../assets/images/cybernomads.jpg"
import Arrow from "../../../assets/icons/arrow"
import styles from "./styles.module.scss"
import productStyles from "../ProductsFrame/styles.module.scss"

const PartnerLinkFrame = () => {
    return (
        <Layout>
            <div className={styles.partner}>
                <img className={styles.img} src={img} alt="" />
                <div className={styles.partner__content}>
                    <h2 className={`${productStyles.white_text} ${styles.title}`}>Информационный портал кибербезопасности!</h2>
                    <p className={`${productStyles.white_text} ${styles.paragraph}`}>Мы предлагаем практические шаги для надёжной архитектуры ИБ, список лучших экспертов и широкий выбор материалов. Будьте в курсе новейших угроз и получайте рекомендации по предотвращению. Присоединяйтесь к нам и защищайте свои ценности!</p>
                    <button className={productStyles.tabs__btn}>Открыть сайт партнера<Arrow theme="dark"/></button>
                </div>
            </div>
        </Layout>
    )
}

export default PartnerLinkFrame