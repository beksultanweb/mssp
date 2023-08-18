import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { useState, useEffect, LegacyRef, useRef, FormEvent, ChangeEvent } from 'react'

import Modal from '.'

import styles from './styles.module.scss'

import info from '../../assets/icons/info-circle.svg'
import AuthService from '../../services/auth'
import { AuthStore } from '../../store/AuthStore'
import Button from '../Button'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^(?!$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


const Register = ({ close, authStore, setLoginOpen }: {close: () => void, authStore?: AuthStore, setLoginOpen: () => void}) => {
    const firstNameRef: LegacyRef<HTMLInputElement> = useRef(null)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatch, setValidMatch] = useState(false)

    const [name, setName] = useState('')

    const [checkboxChecked, setCheckboxChecked] = useState(false)

    const [errMsg, setErrMsg] = useState('');
    const [checkRun, setCheckRun] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if(firstNameRef.current) {
            firstNameRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidMatch(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setErrMsg('')
    }, [email, password, matchPassword])

    const handleCheckBoxChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked) {
            setCheckboxChecked(true)
        }
    }

    const handleSwithchToLogin = () => {
        close()
        setLoginOpen()
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setCheckRun(true)
        const v1 = EMAIL_REGEX.test(email)
        const v2 = PWD_REGEX.test(password)
        if (!v1 || !v2 || !checkboxChecked) {
            return
        }
        try {
            const response = await AuthService.registration(email, password, name)
            localStorage.setItem('token', response.data.accessToken)
            setSuccess(true)
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                setErrMsg(error.response.data.message)
            }
            else setErrMsg('Неопознанная ошибка, обратитесь к администратору сайта')
        }
    }

    return (
        <Modal title="Регистрация" subtitle="Для того чтобы отслеживать статус вашей заявки, необходимо зарегистрироваться." close={close} removeScroll={true}>
            <p className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
            <p className={success ? styles.success : styles.offscreen}>
                Регистрация прошла успешно! Можете <p className={styles.success__link} onClick={handleSwithchToLogin}>войти в личный кабинет</p>.
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.form__inputs}>
                    <input className={styles.input} ref={firstNameRef} value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Как к Вам обращаться?" />
                    <input className={styles.input} aria-invalid={validEmail ? false : true} aria-describedby="emailnote" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                    <p className={!email && checkRun ? styles.instructions : styles.offscreen}>
                        <img src={info} alt="" />Email обязателен к заполнению
                    </p>
                    <p id="emailnote" className={`${email && !validEmail ? styles.instructions : styles.offscreen}`}>
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
                    <input className={styles.input} value={matchPassword} onChange={(e) => setMatchPassword(e.target.value)} type="password" placeholder="Потвердить пароль" />
                    <p className={!validMatch && validPassword ? styles.instructions : styles.offscreen}>
                        <img src={info} alt="" />Подтвердите пароль дважды
                    </p>
                </div>
                <div className={styles.flex}>
                    <label><input onChange={handleCheckBoxChecked} type="checkbox" name="save" />Я принимаю политику конфиденциальности</label>
                </div>
                <p className={validPassword && validEmail && validMatch && !checkboxChecked ? styles.instructions : styles.offscreen}>Чтобы зарегистрироваться, примите политику конфиденциальности</p>
                <Button className={styles.btnLight} txt='Зарегистрироваться' theme='light'/>
            </form>
        </Modal>
    )
}

export default inject('authStore')(observer(Register))