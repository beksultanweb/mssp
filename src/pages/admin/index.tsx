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

interface ProfileProps extends PageProps {
    authStore: AuthStore
    requestsStore: RequestsStore
}

const Profile: React.FC<ProfileProps> = ({ authStore, requestsStore, location }) => {
    const [dropdownOpened, setOpenedDropdown] = React.useState(false)
    const [modalOpen, setModalOpen] = React.useState(false)

    const handleOpenedDropdown = () => {
        setOpenedDropdown(!dropdownOpened)
    }

    const handleModalOpen = () => {
        setModalOpen(!modalOpen)
    }

    React.useEffect(() => {
        if (localStorage.getItem('token')) {
            authStore.checkAuth()
        }
        else {
            navigate('/')
        }
    }, [])

    React.useEffect(() => {
        requestsStore.getAllRequests()
    }, [requestsStore.requests])

    const requests = requestsStore.requests.map(({ date, _id, status, title, user, domain }) => {
        const data = new Date(date).toLocaleDateString()
        const color = `${status === 'новая'?styles.blue:status === 'в работе'?styles.green:status === 'исполнена'?styles.fiolet:status === 'закрыта'?styles.black:status==='отменена'?styles.red:''}`
        return (
        <div key={title} className={styles.request}>
            <div className={styles.request__item}>
                <div>{data}</div>
                <div className={styles.request__title}>{title}</div>
                <div>{domain}</div>
                <div className={styles.status}><div className={`${styles.circle} ${color} ${styles.circle__doing}`}></div>{status}</div>
                <Link to={`${location.pathname + 'update'}`} state={{ requestId: _id, author: user }}><button className={styles.request__btn}>Редактировать<Arrow theme="light"/></button></Link>
            </div>
        </div>)})

    if(authStore.user.roles?.includes(5150) === false) {
        navigate('/')
        return null
    }
    return (
        <section className={styles.profile}>
        <Header theme="light"/>
        <Layout>
            <div className={styles.flex}>
                <div onClick={handleOpenedDropdown} className={styles.status__dropdown}>Статус <img src={arrow} alt="" /></div>
            </div>
            {dropdownOpened &&
            <div className={styles.status__dropdown_menu}>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__doing}`}></div>в работе</div>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__new}`}></div>новая</div>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__done}`}></div>исполнена</div>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__closed}`}></div>закрыта</div>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__canceled}`}></div>отменена</div>
            </div>}
            {requests}
        </Layout>
        {modalOpen && <CreateRequest close={() => setModalOpen(false)}/>}
        <Footer theme="light"/>
        </section>
    )
}

export default inject('authStore', 'requestsStore')(observer(Profile))