import React from "react"
import Layout from "../../../components/Layout"
import Arrow from "../../../assets/icons/arrow"
import styles from "./styles.module.scss"

const CTAFrame = () => {
    return (
        <section>
        <Layout>
            <h2 className={styles.calltoaction__title}>Надёжная защита ваших данных и бизнеса — наша главная задача!</h2>
            <p className={styles.calltoaction__subtitle}>Гарантируем доступ к экспертам по кибербезопасности высочайшего уровня для вашей компании, где бы она ни находилась и какого бы масштаба не была!</p>
            <button className={styles.calltoaction__btn}>Хотите, чтобы мы связались с вами?<Arrow/></button>
        </Layout>
        </section>
    )
}

export default CTAFrame