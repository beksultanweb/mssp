import axios from 'axios'
import { PageProps, navigate } from 'gatsby'
import { inject, observer } from 'mobx-react'
import React from 'react'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import download from '../../assets/icons/download.svg'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import RequestsService from '../../services/requests'
import { AuthStore } from '../../store/AuthStore'
import { RequestsStore } from '../../store/RequestsStore'

interface ProfileProps extends PageProps {
    authStore: AuthStore
    requestsStore: RequestsStore
}

const Request: React.FC<ProfileProps> = ({ authStore, requestsStore, location }) => {
    const [errMsg, setErrMsg] = React.useState('')

    React.useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('token')) {
            authStore.checkAuth()
        }
        location.state &&
        requestsStore.getRequest(location.state.requestId)
    }, [])

    const { _id, title, status, paid, reports } = requestsStore.request
    const color = `${status === 'новая'?styles.blue:status === 'в работе'?styles.green:status === 'исполнена'?styles.fiolet:status === 'закрыта'?styles.black:status==='отменена'?styles.red:''}`

    const handleDownload = async (fileName: string) => {
        try {
            const response = await RequestsService.download(_id, fileName)
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            link.click()
            window.URL.revokeObjectURL(url)

        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                setErrMsg(error.response.data.message)
            }
        }
    }

    if(authStore.user.roles?.includes(2001) === false) {
        navigate('/')
        return null
    }
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
                                <div className={`${styles.status} ${styles.status__light}`}><div className={`${styles.circle} ${color} ${styles.circle__doing}`}></div>{status}</div>
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
                            {reports && reports.map(report => (
                            <div key={report} className={styles.document__item}>
                                <p>{report}</p>
                                <a download onClick={() => handleDownload(report)} className={styles.request__btn}>Скачать<img src={download} alt="" /></a>
                            </div>))}
                            {reports?.length === 0 && <div>Документы пока не были загружены администратором...</div>}
                            {errMsg && <div>{errMsg}</div>}
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