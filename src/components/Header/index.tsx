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
import ResetPwd from '../Modal/ResetPwd';
import Button from '../Button';

interface HeaderProps {
    theme: string
    authStore?: AuthStore
}

const Header: React.FC<HeaderProps> = ({ theme, authStore }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loginOpen, setloginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)
    const [resetPwdOpen, setResetPwdOpen] = useState(false)
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

    const handleResetPwdOpen = () => {
        setResetPwdOpen(!resetPwdOpen)
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
                        {authStore?.user.email.split('@')[0]}
                        {userDropdownOpen && <div className={styles.logout}>
                            <Link to={authStore.user.roles?.includes(5150) ? '/admin' : '/profile'}><button className={styles.logout__btn}>В личный кабинет<Arrow theme='light'/></button></Link>
                            <button onClick={handleQuit} className={styles.logout__btn}>Выйти<Arrow theme="light"/></button>
                        </div>}
                    </div>}
                    {!authStore?.isAuth && <Button className={`${theme === 'light' ? styles.btnLight : ''} ${styles.btn}`} theme={theme} handleloginOpen={handleloginOpen} txt='Войти'/>}
                    <button onClick={handleMenuOpen} className={`${theme === 'light' ? styles.light : styles.dark} ${isOpen ? styles.mobile__burger_open : styles.mobile__burger}`}>{!isOpen && 'Меню'}<Arrow theme={theme === 'light' ? 'dark' : 'light'}/></button>
                </header>
            </Layout>
            {loginOpen && <Login setResetPwdOpen={handleResetPwdOpen} setRegisterOpen={handleRegisterOpen} close={handleloginOpen}/>}
            {registerOpen && <Register setLoginOpen={handleloginOpen} close={handleRegisterOpen}/>}
            {/* {resetPwdOpen && <ResetPwd close={handleResetPwdOpen}/>} */}
        </RemoveScroll>
    )
}

export default inject('authStore')(observer(Header))