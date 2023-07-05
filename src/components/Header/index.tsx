import React, {useState, useEffect} from "react"
import { Link, navigate } from "gatsby"
import { routeElements } from "../../config/routeElements"
import Logo from "../../assets/icons/logo"
import Arrow from "../../assets/icons/arrow"
import Layout from "../Layout"
import styles from "./styles.module.scss"
import {RemoveScroll} from 'react-remove-scroll';
import AuthComponent from "../AuthComponent"
import {observer, inject} from "mobx-react"
import { AuthStore } from "../../store/AuthStore"

type HeaderProps = {
    theme: string
    authStore?: AuthStore
}

const Header: React.FC<HeaderProps> = ({ theme, authStore }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)

    const handleMenuOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleModalOpen = () => {
        setModalOpen(!modalOpen)
    }

    useEffect(() => {
        if(authStore?.isAuth) {
            setModalOpen(false)
            navigate('/profile')
        }
    }, [authStore?.isAuth])

    const handleUserDropdownOpen = () => {
        setUserDropdownOpen(!userDropdownOpen)
    }

    return (
        <RemoveScroll enabled={isOpen || modalOpen}>
            <Layout>
                <header>
                    <div className={styles.nav}>
                        <Link className={styles.logo} to={"/"}><Logo theme={isOpen ? 'light' : theme}/></Link>
                        <div className={`${isOpen ? styles.mobile__menu_open : ''} ${styles.mobile__menu}`}>
                            {isOpen && <Link onClick={handleModalOpen} className={styles.link_open} to="">Профиль</Link>}
                        {routeElements.map(route => (
                            <Link className={`${theme === 'light' ? styles.light : ''} ${isOpen ? styles.link_open : styles.link}`} to={route.url}>{isOpen && route.text[0].toUpperCase()}{isOpen ? route.text.slice(1) : route.text}</Link>
                        ))}
                        </div>
                    </div>
                    {authStore?.isAuth && <div className={`${theme === 'light' ? styles.light : ''} ${styles.user}`} onClick={handleUserDropdownOpen}>
                        {authStore?.user.email}
                        {userDropdownOpen && <div className={styles.logout}>
                            <button onClick={() => authStore?.logout()} className={styles.logout__btn}>Выйти<Arrow theme="light"/></button>
                        </div>}
                    </div>}
                    {!authStore?.isAuth && <button onClick={handleModalOpen} className={`${theme === 'light' ? styles.btnLight : ''} ${styles.btn}`}>Войти<Arrow theme={theme}/></button>}
                    <button onClick={handleMenuOpen} className={`${theme === 'light' ? styles.light : styles.dark} ${isOpen ? styles.mobile__burger_open : styles.mobile__burger}`}>{!isOpen && 'Меню'}<Arrow theme={theme === 'light' ? 'dark' : 'light'}/></button>
                </header>
            </Layout>
            {modalOpen && <AuthComponent type="Auth" close={handleModalOpen}/>}
        </RemoveScroll>
    )
}

export default inject('authStore')(observer(Header))