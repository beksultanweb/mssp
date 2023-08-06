import { Link, PageProps } from 'gatsby'
import { inject, observer } from 'mobx-react'
import { useState, useEffect } from 'react'

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

const Admin: React.FC<ProfileProps> = ({ authStore, requestsStore, location }) => {
    const [dropdownOpened, setOpenedDropdown] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [currStatus, setCurrStatus] = useState('')

    const handleOpenedDropdown = () => {
        setOpenedDropdown(!dropdownOpened)
    }

    const handleChangeStatus = (status: string) => {
        setCurrStatus(status)
    }

    useEffect(() => {
        requestsStore.getAllRequests(currStatus)
    }, [currStatus])

    const requests = requestsStore.requests.map(({ date, _id, status, title, user, domain }) => {
        const data = new Date(date).toLocaleDateString()
        const color = `${status === 'новая'?styles.blue:status === 'в работе'?styles.green:status === 'исполнено'?styles.fiolet:status === 'закрыта'?styles.black:status==='отменена'?styles.red:''}`
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

    return (
        <section className={styles.profile}>
        <Header theme="light"/>
        <Layout>
            <div className={styles.flex}>
                <div onClick={handleOpenedDropdown} className={styles.status__dropdown}>Статус <img src={arrow} alt="" /></div>
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
            {requests}
        </Layout>
        {modalOpen && <CreateRequest close={() => setModalOpen(false)}/>}
        <Footer theme="light"/>
        </section>
    )
}

export default inject('authStore', 'requestsStore')(observer(Admin))