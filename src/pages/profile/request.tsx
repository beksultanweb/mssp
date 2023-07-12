import { PageProps, navigate } from 'gatsby'
import { inject, observer } from 'mobx-react'
import React from 'react'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import download from '../../assets/icons/download.svg'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import { AuthStore } from '../../store/AuthStore'
import { RequestsStore } from '../../store/RequestsStore'

interface ProfileProps extends PageProps {
    authStore: AuthStore
    requestsStore: RequestsStore
}

const Request: React.FC<ProfileProps> = ({ authStore, requestsStore, location }) => {
    if(!authStore.isAuth) {
        navigate('/')
    }

    React.useEffect(() => {
        location.state &&
        requestsStore.getRequest(location.state.requestId)
    }, [requestsStore.request])

    const { title, status, paid } = requestsStore.request

    return (
        <section className={styles.profile}>
            <Header theme="light"/>
            <Layout>
                <div className={styles.flex}>
                    <div>
                        <h2 className={styles.title}>{title}</h2>
                        <div className={styles.request__status}>
                            <div className={styles.request__status_item}>
                                <div className={styles.title}>Статус заявки</div>
                                <div className={`${styles.status} ${styles.status__light}`}><div className={`${styles.circle} ${styles.circle__doing}`}></div>{status}</div>
                            </div>
                            <div className={styles.request__status_item}>
                                <div className={styles.title}>Статус оплаты</div>
                                <div className={styles.title}>{paid === false ? 'Не оплачен' : 'Оплачен'}</div>
                            </div>
                        </div>
                    </div>
                    <button className={styles.btnLight}>Оплатить<Arrow theme="light"/></button>
                </div>
            </Layout>
            <section className={styles.document}>
                <Layout>
                    <div className={styles.document__content}>
                        <h3 className={styles.document__title}>Документы</h3>
                        <div className={styles.document__flex}>
                            <div className={styles.document__item}>
                                <p>Отчет 1</p>
                                <button className={styles.request__btn}>Скачать<img src={download} alt="" /></button>
                            </div>
                            <div className={styles.document__item}>
                                <p>Отчет 1</p>
                                <button className={styles.request__btn}>Скачать<img src={download} alt="" /></button>
                            </div>
                            <div className={styles.document__item}>
                                <p>Отчет 1</p>
                                <button className={styles.request__btn}>Скачать<img src={download} alt="" /></button>
                            </div>
                        </div>
                    </div>
                </Layout>
            </section>
            <Layout>
                <div className={styles.comments}>
                    <h3 className={styles.comments__title}>Комментарии</h3>
                    <p className={styles.comments__descr}>Команда c большим практическим опытом,  подтвержденным международными  сертификатами OSCP, CEH, CHFI, WAST, OSCP, ISO и свидетельствами государственного  образца в области защиты информации</p>
                </div>
            </Layout>
            <Footer theme="light"/>
        </section>
    )
}

export default inject('authStore', 'requestsStore')(observer(Request))