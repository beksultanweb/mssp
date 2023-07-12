import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import styles from './styles.module.scss'

import Arrow from '../../../assets/icons/arrow'
import Layout from '../../../components/Layout'

const DodgerFrame = () => {
    return (
        <section className={styles.dodger}>
            <StaticImage className={styles.dodger__img} src="../../../assets/images/dodger.png" alt="dodger_img"/>
            <div className={styles.darknet}>Darknet</div>
            <div className={styles.security}>Security</div>
            <Layout>
                <h2>Dodger</h2>
                <div className={styles.flex}>
                    <span>/005</span>
                    <p className={styles.paragraph}>Комплекс предназначен для постоянного мониторинга состояния вашей инфраструктуры на уязвимости и возможности их эксплуатации. Мы также предоставляем мониторинг данных в Darknet, чтобы вы могли оперативно реагировать на любые угрозы и предотвратить возможные нарушения безопасности.</p>
                </div>
                <button>Подробнее<Arrow theme="dark"/></button>
            </Layout>
        </section>
    )
}

export default DodgerFrame