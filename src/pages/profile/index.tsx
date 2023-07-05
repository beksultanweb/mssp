import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import { Footer } from "../../components/Footer"
import Layout from "../../components/Layout"
import arrow from "../../assets/icons/status.svg"
import styles from "./styles.module.scss"
import Arrow from "../../assets/icons/arrow"
import { inject, observer } from "mobx-react"
import { RequestsStore } from "../../store/RequestsStore"
import { navigate } from "gatsby"
import { AuthStore } from "../../store/AuthStore"

const Profile = ({authStore, requestsStore}: {authStore: AuthStore, requestsStore: RequestsStore}) => {
    const [dropdownOpened, setOpenedDropdown] = React.useState(false)
    const handleOpenedDropdown = () => {
        setOpenedDropdown(!dropdownOpened)
    }

    if(!authStore.isAuth) {
        navigate("/")
        return null
    }

    useEffect(() => {
        requestsStore.getMyRequests()
    }, [])

    return (
        <section className={styles.profile}>
        <Header theme="light"/>
        <Layout>
            <div className={styles.flex}>
                <div onClick={handleOpenedDropdown} className={styles.status__dropdown}>Статус <img src={arrow} alt="" /></div>
                <button className={styles.btn}>Создать заявку<Arrow theme="dark"/></button>
            </div>
            {dropdownOpened &&
            <div className={styles.status__dropdown_menu}>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__doing}`}></div>в работе</div>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__new}`}></div>новая</div>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__done}`}></div>исполнена</div>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__closed}`}></div>закрыта</div>
                <div className={styles.status}><div className={`${styles.circle} ${styles.circle__canceled}`}></div>отменена</div>
            </div>}
            {requestsStore.requests?.map(request => (
            <div className={styles.request}>
                <div className={styles.request__item}>
                    <div>{request.date}</div>
                    <div className={styles.request__title}>{request.title}</div>
                    <div className={styles.status}><div className={`${styles.circle} ${styles.circle__doing}`}></div>{request.status}</div>
                    <button className={styles.request__btn}>Подробнее<Arrow theme="light"/></button>
                </div>
            </div>))}
        </Layout>
        <Footer theme="light"/>
        </section>
    )
}

export default inject('authStore', 'requestsStore')(observer(Profile))