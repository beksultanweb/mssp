import { Link, PageProps, navigate } from 'gatsby'
import { observer, inject } from 'mobx-react'
import { useState, FC, useEffect } from 'react'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import LangArrow from '../../assets/icons/langarrow'
import Logo from '../../assets/icons/logo'
import { routeElements } from '../../config/routeElements'
import { LANGUAGES } from '../../constants/languages'
import { AuthStore } from '../../store/AuthStore'
import Button from '../Button';
import Layout from '../Layout'

import Login from '../Modal/Login'
import Register from '../Modal/Register'
import ResetPwd from '../Modal/ResetPwd';


interface HeaderProps extends PageProps {
    theme: string
    authStore?: AuthStore
}

const Header: FC<HeaderProps> = ({ theme, authStore }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [langMenuOpen, setLangMenuOpen] = useState(false)
    const [loginOpen, setloginOpen] = useState(false)
    const [registerOpen, setRegisterOpen] = useState(false)
    const [resetPwdOpen, setResetPwdOpen] = useState(false)
    const [userDropdownOpen, setUserDropdownOpen] = useState(false)

    const [currentLang, setCurrentLang] = useState('Русский')

    const handleChangeLang = (label: string) => {
        setCurrentLang(label)
    }

    const handleLangMenuOpen = () => {
        setLangMenuOpen(!langMenuOpen)
    }

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
        <>
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
                    <div>
                        <div className={`${theme === 'light' ? styles.light : ''} ${styles.lang}`} onClick={handleLangMenuOpen}>{currentLang} <LangArrow theme={theme} rotate={langMenuOpen}/></div>
                        {langMenuOpen &&
                        <div className={styles.lang__menu}>
                            <ul>
                                {LANGUAGES.map(({ code, label }) => (
                                    <li key={code} onChange={() => handleChangeLang(label)} className={styles.kaz}>{label}</li>
                                ))}
                            </ul>
                        </div>}
                    </div>
                    {!authStore?.isAuth && <Button className={`${theme === 'light' ? styles.btnLight : ''} ${styles.btn}`} theme={theme} handleloginOpen={handleloginOpen} txt='Войти'/>}
                    <button onClick={handleMenuOpen} className={`${theme === 'light' ? styles.light : styles.dark} ${isOpen ? styles.mobile__burger_open : styles.mobile__burger}`}>{!isOpen && 'Меню'}<Arrow theme={theme === 'light' ? 'dark' : 'light'}/></button>
                </header>
            </Layout>
            {loginOpen && <Login setResetPwdOpen={handleResetPwdOpen} setRegisterOpen={handleRegisterOpen} close={handleloginOpen}/>}
            {registerOpen && <Register setLoginOpen={handleloginOpen} close={handleRegisterOpen}/>}
            {resetPwdOpen && <ResetPwd close={handleResetPwdOpen}/>}
        </>
    )
}

export default inject('authStore')(observer(Header))