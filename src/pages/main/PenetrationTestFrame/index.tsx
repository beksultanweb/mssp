import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import styles from './styles.module.scss'

import Button from '../../../components/Button'
import Layout from '../../../components/Layout'

const PenetrationTestFrame = ({ handleConsultationOpen }: {handleConsultationOpen: () => void}) => {
    return (
        <section className={styles.penetration}>
            <div className={styles.report}>Report</div>
            <div className={styles.startup}>Startup</div>
            <div className={styles.invest}>Invest</div>
            <div className={styles.security}>Security</div>
            <Layout>
                <h2>Penetration test (Sentest)</h2>
                <span>/004</span><p className={styles.paragraph}>Sentest – идеальный инструмент для укрепления репутации вашей компании среди инвесторов и клиентов. Наш сервис позволяет демонстрировать ваше ответственное отношение к защите данных и конфиденциальности, что поможет улучшить восприятие вашего бренда и повысить доверие к вашей компании.</p>
                <div className={styles.countries}>У нас есть клиенты из разных стран</div>
                <div className={styles.countries__flags}>
                    <div className={styles.countries__flags_item}>
                        <StaticImage src="../../../assets/icons/JP.svg" alt="" />
                        <div className={styles.country}>Япония</div>
                    </div>
                    <div className={styles.countries__flags_item}>
                        <StaticImage src="../../../assets/icons/US.svg" alt="" />
                        <div className={styles.country}>США</div>
                    </div>
                    <div className={styles.countries__flags_item}>
                        <StaticImage src="../../../assets/icons/IN.svg" alt="" />
                        <div className={styles.country}>Индия</div>
                    </div>
                    <div className={styles.countries__flags_item}>
                        <StaticImage src="../../../assets/icons/KZ.svg" alt="" />
                        <div className={styles.country}>Казахстан</div>
                    </div>
                </div>
                <Button txt='Оставить заявку' handleConsultationOpen={handleConsultationOpen} theme='dark'/>
            </Layout>
            <StaticImage src="../../../assets/images/021A5908.jpg" width={651} height={620} alt="penetration" objectPosition={'40% 40%'} imgStyle={{ borderRadius: '24px 0 0 24px' }} className={styles.penetration__img}/>
        </section>
    )
}

export default PenetrationTestFrame