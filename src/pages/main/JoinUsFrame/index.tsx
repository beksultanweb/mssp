import React from "react"
import Arrow from "../../../assets/icons/arrow"
import Layout from "../../../components/Layout"
import styles from "./styles.module.scss"
import productStyles from "../ProductsFrame/styles.module.scss"

const JoinUsFrame = () => {
    return (
        <section className={styles.join}>
            <Layout>
                <div className={styles.content}>
                    <h2 className={`${productStyles.white_text} ${styles.title}`}>Присоединяйтесь к «Cyber Nomads» - крупнейшему форуму ИБ в Казахстане!</h2>
                    <p className={`${productStyles.white_text} ${styles.paragraph}`}>Событие пройдёт 14–15 мая в Астане. Будьте в центре событий кибербезопасности!</p>
                    <button className={productStyles.tabs__btn}>Зарегистрироваться<Arrow theme="dark"/></button>
                </div>
            </Layout>
        </section>
    )
}

export default JoinUsFrame