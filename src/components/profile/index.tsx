import { navigate, Link, PageProps } from 'gatsby'
import { inject, observer } from 'mobx-react'
import React from 'react'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import arrow from '../../assets/icons/status.svg'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'

import CreateRequest from '../../components/Modal/CreateRequest'
import { AuthStore } from '../../store/AuthStore'
import { RequestsStore } from '../../store/RequestsStore'
import { RequestsResponse } from '../../types/RequestsResponse'

interface ProfileProps extends PageProps {
    authStore: AuthStore
    requestsStore: RequestsStore
}

const Profile: React.FC<ProfileProps> = ({ authStore, requestsStore, location }) => {
    const [dropdownOpened, setOpenedDropdown] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)
    const [currStatus, setCurrStatus] = React.useState('')
    const [requests, setRequests] = React.useState<RequestsResponse[]>([])

    const handleOpenedDropdown = () => {
        setOpenedDropdown(!dropdownOpened)
    }

    const handleChangeStatus = (status: string) => {
        setCurrStatus(status)
    }

    const handleModalOpen = () => {
        setModalOpen(!modalOpen)
    }

    React.useEffect(() => {
        requestsStore.getMyRequests(authStore.user.id, currStatus)
    }, [!modalOpen, currStatus, requestsStore, authStore.user.id])

    React.useEffect(() => {
        setRequests(requestsStore.requests)
    }, [requestsStore.requests])

    const myrequests = requests.map(({ _id, date, status, title }) => {
        const data = new Date(date).toLocaleDateString()
        const color = `${status === 'новая'?styles.blue:status === 'в работе'?styles.green:status === 'исполнено'?styles.fiolet:status === 'закрыта'?styles.black:status==='отменена'?styles.red:''}`
        return (
        <div key={title} className={styles.request}>
            <div className={styles.request__item}>
                <div>{data}</div>
                <div className={styles.request__title}>{title}</div>
                <div className={styles.status}><div className={`${styles.circle} ${color} ${styles.circle__doing}`}></div>{status}</div>
                <Link to={`${location.pathname + 'request'}`} state={{ requestId: _id }}><button className={styles.request__btn}>Подробнее<Arrow theme="light"/></button></Link>
            </div>
        </div>)})

    return (
        <section className={styles.profile}>
        <Header theme="light"/>
        <Layout>
            <div className={styles.flex}>
                <div onClick={handleOpenedDropdown} className={styles.status__dropdown}>Статус <img src={arrow} alt="" /></div>
                <button onClick={handleModalOpen} className={styles.btn}>Создать заявку<Arrow theme="dark"/></button>
            </div>
            {dropdownOpened &&
            <div className={styles.status__dropdown_menu}>
                <div onClick={() => handleChangeStatus('')} className={styles.status}><div className={`${styles.circle} ${styles.nostatus}`}></div>весь список</div>
                <div onClick={() => handleChangeStatus('в работе')} className={styles.status}><div className={`${styles.circle} ${styles.green}`}></div>в работе</div>
                <div onClick={() => handleChangeStatus('новая')} className={styles.status}><div className={`${styles.circle} ${styles.blue}`}></div>новая</div>
                <div onClick={() => handleChangeStatus('исполнено')} className={styles.status}><div className={`${styles.circle} ${styles.fiolet}`}></div>исполнено</div>
                <div onClick={() => handleChangeStatus('закрыта')} className={styles.status}><div className={`${styles.circle} ${styles.black}`}></div>закрыта</div>
                <div onClick={() => handleChangeStatus('отменена')} className={styles.status}><div className={`${styles.circle} ${styles.red}`}></div>отменена</div>
            </div>}
            {myrequests.length === 0 && <div className={styles.request}>
                <div className={styles.request__item_none}>
                    Для начала добавьте свой запрос, чтобы отобразить список всех ваших запросов
                </div>
            </div>}
            {myrequests}
        </Layout>
        {modalOpen && <CreateRequest close={() => setModalOpen(false)}/>}
        <Footer theme="light"/>
        </section>
    )
}

export default inject('authStore', 'requestsStore')(observer(Profile))