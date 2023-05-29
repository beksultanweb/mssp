import React from "react"
import styles from "./styles.module.scss"
import Layout from "../../../components/Layout"
import partner from "../../../assets/icons/partner.svg"
import partner1 from "../../../assets/icons/partner1.svg"
import partner2 from "../../../assets/icons/partner2.svg"
import partner3 from "../../../assets/icons/partner3.svg"

const ClientsFrame = () => {
    return (
        <section className={styles.clients}>
            <Layout>
                <div className={styles.about__content}>
                    <div>
                        <span>/006</span>
                        <h2 className={styles.title}>Клиенты</h2>
                    </div>
                    <div>
                        <div className={styles.about}>Наша компания оценена профессионалами из более 50 крупных компаний и всех министерств и силовых структур Казахстана.</div>
                        <div className={styles.paragraph}>Мы поможем защитить ваш бизнес от киберугроз с помощью тестирования на проникновение, анализа уязвимостей, создания системы безопасности и обучения правилам кибербезопасности.</div>
                    </div>
                </div>
                <div className={styles.partners}>
                    <img src={partner} alt="" />
                    <img src={partner1} alt="" />
                    <img src={partner2} alt="" />
                    <img src={partner3} alt="" />
                </div>
            </Layout>
        </section>
    )
}

export default ClientsFrame