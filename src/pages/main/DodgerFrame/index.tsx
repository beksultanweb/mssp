import React from "react"
import Layout from "../../../components/Layout"
import styles from "./styles.module.scss"
import Arrow from "../../../assets/icons/arrow"
import penetrationStyles from "../PenetrationTestFrame/styles.module.scss"

export const DodgerFrame = () => {
    return (
        <section className={styles.dodger}>
            <div className={styles.bg_text}>Darknet</div>
            <div className={styles.bg_text}>Security</div>
            <Layout>
                <div className={styles.content}>
                    <h2>Dodger</h2>
                    <span>/005</span><p className={styles.paragraph}>Комплекс предназначен для постоянного мониторинга состояния вашей инфраструктуры на уязвимости и возможности их эксплуатации. Мы также предоставляем мониторинг данных в Darknet, чтобы вы могли оперативно реагировать на любые угрозы и предотвратить возможные нарушения безопасности.</p>
                    <button>Подробнее<Arrow/></button>
                </div>
            </Layout>
        </section>
    )
}