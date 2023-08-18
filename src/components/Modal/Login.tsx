import axios from 'axios'
import { navigate } from 'gatsby'
import { inject, observer } from 'mobx-react'
import { useState, useEffect, LegacyRef, useRef, FormEvent } from 'react'

import Modal from '.'

import styles from './styles.module.scss'

import info from '../../assets/icons/info-circle.svg'
import usePersist from '../../hooks/usePersist'
import AuthService from '../../services/auth'
import { AuthStore } from '../../store/AuthStore'
import Button from '../Button'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const Login = ({ close, setRegisterOpen, setResetPwdOpen, authStore }: {close: () => void, setRegisterOpen: () => void, setResetPwdOpen: () => void, authStore?: AuthStore}) => {
    const emailRef: LegacyRef<HTMLInputElement> = useRef(null)
    const errRef: LegacyRef<HTMLInputElement> = useRef(null)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [persist, setPersist] = usePersist()

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [errMsg, setErrMsg] = useState('');
    const [checkRun, setCheckRun] = useState(false);

    const handlePersist = () => setPersist((prev: boolean) => !prev)

    useEffect(() => {
        if(emailRef.current) {
            emailRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSwithchToRegister = () => {
        close()
        setRegisterOpen()
    }

    const handleSwithchToResetPwd = () => {
        close()
        setResetPwdOpen()
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setCheckRun(true)
        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(password)
        if (!v1 || !v2) {
            return
        }
        try {
            const response = await AuthService.login(email, password)
            localStorage.setItem('token', response.data.accessToken)
            authStore?.setAuth(true)
            authStore?.setUser(response.data.user)
            close()
            navigate(authStore?.user.roles?.includes(5150) ? '/admin' : '/profile')
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                setErrMsg(error.response.data.message)
            }
            else setErrMsg('Unexpected error')
            errRef.current && errRef.current.focus()
        }
    }

    return (
        <Modal title="Вход" subtitle="Для создания и отслеживания статуса вашей заявки, пожалуйста, войдите в свой личный кабинет." close={close} removeScroll={true}>
            <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.form__inputs}>
                    <input className={styles.input} aria-invalid={validEmail ? false : true} aria-describedby="emailnote" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                    <p className={!email && checkRun ? styles.instructions : styles.offscreen}>
                        <img src={info} alt="" />Email обязателен к заполнению
                    </p>
                    <p id="emailnote" className={email && !validEmail ? styles.instructions : styles.offscreen}>
                        <img src={info} alt="" />Email должен содержать латинские буквы, @ и точку.
                    </p>
                    <input className={styles.input} aria-invalid={validPassword ? false : true} aria-describedby="pwdnote" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="pasword" placeholder="Пароль" />
                    <p className={!password && checkRun ? styles.instructions : styles.offscreen}>
                        <img src={info} alt="" />Пароль обязателен к заполнению
                    </p>
                    <p id="pwdnote" className={password && !validPassword ? styles.instructions : styles.offscreen}>
                       <img src={info} alt="" />Пароль должен содержать от 8 до 24 символов.<br/>
                        Хотябы одну букву верхнего регистра,<br/>
                        одну цифру и один спец.символ.
                    </p>
                </div>
                <div className={styles.flex}>
                    <label><input onChange={handlePersist} type="checkbox" id="persist" checked={persist} />Запомнить меня</label>
                    <div onClick={handleSwithchToResetPwd} className={styles.forget}>Забыли пароль?</div>
                </div>
                <div className={styles.buttons}>
                    <Button className={styles.btnLight} theme='light' txt='Войти'/>
                    <div className={styles.or}>или</div>
                    <Button handleSwithchToRegister={handleSwithchToRegister} className={styles.btn} theme='dark' txt='Зарегистрироваться'/>
                </div>
            </form>
        </Modal>
    )
}

export default inject('authStore')(observer(Login))