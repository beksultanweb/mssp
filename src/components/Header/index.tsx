import { Link, navigate } from 'gatsby'
import { observer, inject } from 'mobx-react'
import React, { useState, useEffect } from 'react'

import { RemoveScroll } from 'react-remove-scroll';

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import Logo from '../../assets/icons/logo'
import { routeElements } from '../../config/routeElements'
import { AuthStore } from '../../store/AuthStore'
import Layout from '../Layout'

import Login from '../Modal/Login'
import Register from '../Modal/Register'

interface HeaderProps {
    theme: string
    authStore?: AuthStore
}

const Header: React.FC<HeaderProps> = ({ theme, authStore }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loginOpen, setloginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)

    const handleMenuOpen = () => {
        setIsOpen(!isOpen)
    }

    const handleloginOpen = () => {
        setloginOpen(!loginOpen)
    }

    const handleRegisterOpen = () => {
        setRegisterOpen(!registerOpen)
    }

    const handleUserDropdownOpen = () => {
        setUserDropdownOpen(!userDropdownOpen)
    }

    const handleQuit = () => {
        authStore?.logout()
        navigate('/')
    }

    return (
        <RemoveScroll enabled={isOpen || loginOpen || registerOpen}>
            <Layout>
                <header>
                    <div className={styles.nav}>
                        <Link className={styles.logo} to={'/'}><Logo theme={isOpen ? 'light' : theme}/></Link>
                        <div className={`${isOpen ? styles.mobile__menu_open : ''} ${styles.mobile__menu}`}>
                            {isOpen && <Link onClick={handleloginOpen} className={styles.link_open} to="">Профиль</Link>}
                        {routeElements.map(route => (
                            <Link key={route.url} className={`${theme === 'light' ? styles.light : ''} ${isOpen ? styles.link_open : styles.link}`} to={route.url}>{isOpen && route.text[0].toUpperCase()}{isOpen ? route.text.slice(1) : route.text}</Link>
                        ))}
                        </div>
                    </div>
                    {authStore?.isAuth && <div className={`${theme === 'light' ? styles.light : ''} ${styles.user}`} onClick={handleUserDropdownOpen}>
                        {authStore?.user.email}
                        {userDropdownOpen && <div className={styles.logout}>
                            <Link to={authStore.user.roles?.includes(5150) ? '/admin' : '/profile'}><button className={styles.logout__btn}>В личный кабинет<Arrow theme='light'/></button></Link>
                            <button onClick={handleQuit} className={styles.logout__btn}>Выйти<Arrow theme="light"/></button>
                        </div>}
                    </div>}
                    {!authStore?.isAuth && <button onClick={handleloginOpen} className={`${theme === 'light' ? styles.btnLight : ''} ${styles.btn}`}>Войти<Arrow theme={theme}/></button>}
                    <button onClick={handleMenuOpen} className={`${theme === 'light' ? styles.light : styles.dark} ${isOpen ? styles.mobile__burger_open : styles.mobile__burger}`}>{!isOpen && 'Меню'}<Arrow theme={theme === 'light' ? 'dark' : 'light'}/></button>
                </header>
            </Layout>
            {loginOpen && <Login setRegisterOpen={handleRegisterOpen} close={handleloginOpen}/>}
            {registerOpen && <Register setLoginOpen={handleloginOpen} close={handleRegisterOpen}/>}
        </RemoveScroll>
    )
}

export default inject('authStore')(observer(Header))