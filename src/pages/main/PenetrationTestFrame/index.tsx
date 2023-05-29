import React from "react"
import styles from "./styles.module.scss"
import Layout from "../../../components/Layout"
import Arrow from "../../../assets/icons/arrow"
import kz from "../../../assets/icons/KZ.svg"
import us from "../../../assets/icons/US.svg"
import india from "../../../assets/icons/IN.svg"
import jp from "../../../assets/icons/JP.svg"

const PenetrationTestFrame = () => {
    return (
        <section className={styles.penetration}>
            <div className={styles.bg_text}>Report</div>
            <div className={styles.bg_text}>Startup</div>
            <div className={styles.bg_text}>Invest</div>
            <div className={styles.bg_text}>Security</div>
            <Layout>
                <h2>Penetration test (Sentest)</h2>
                <span>/004</span><p className={styles.paragraph}>Sentest – идеальный инструмент для укрепления репутации вашей компании среди инвесторов и клиентов. Наш сервис позволяет демонстрировать ваше ответственное отношение к защите данных и конфиденциальности, что поможет улучшить восприятие вашего бренда и повысить доверие к вашей компании.</p>
                <div className={styles.countries}>У нас есть клиенты из разных стран</div>
                <div className={styles.countries__flags}>
                    <div className={styles.countries__flags_item}>
                        <img src={jp} alt="" />
                        <div className={styles.country}>Япония</div>
                    </div>
                    <div className={styles.countries__flags_item}>
                        <img src={us} alt="" />
                        <div className={styles.country}>США</div>
                    </div>
                    <div className={styles.countries__flags_item}>
                        <img src={india} alt="" />
                        <div className={styles.country}>Индия</div>
                    </div>
                    <div className={styles.countries__flags_item}>
                        <img src={kz} alt="" />
                        <div className={styles.country}>Казахстан</div>
                    </div>
                </div>
                <button>Оставить заявку<Arrow/></button>
            </Layout>
        </section>
    )
}

export default PenetrationTestFrame