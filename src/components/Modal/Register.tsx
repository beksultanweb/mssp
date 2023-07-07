import React, { FormEvent } from "react"
import styles from "./styles.module.scss"
import Arrow from "../../assets/icons/arrow"
import { inject, observer } from "mobx-react"
import { AuthStore } from "../../store/AuthStore"
import requestsStore from "../../store/RequestsStore"
import Modal from "."
import info from "../../assets/icons/info-circle.svg"
import AuthService from "../../services/auth"

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^(?!$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


const Register = ({close, authStore, setLoginOpen}: {close: () => void, authStore?: AuthStore, setLoginOpen: () => void}) => {
    const firstNameRef: React.LegacyRef<HTMLInputElement> = React.useRef(null)
    const errRef: React.LegacyRef<HTMLInputElement> = React.useRef(null)

    const [email, setEmail] = React.useState('')
    const [validEmail, setValidEmail] = React.useState(false)

    const [password, setPassword] = React.useState('')
    const [validPassword, setValidPassword] = React.useState(false)

    const [matchPassword, setMatchPassword] = React.useState('')
    const [validMatch, setValidMatch] = React.useState(false)

    const [firstName, setFirstName] = React.useState('')
    const [validFirstName, setValidFirstName] = React.useState(false)

    const [secondName, setSecondName] = React.useState('')
    const [validSecondName, setValidSecondName] = React.useState(false)

    const [checkboxChecked, setCheckboxChecked] = React.useState(false)

    const [errMsg, setErrMsg] = React.useState('');
    const [checkRun, setCheckRun] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    React.useEffect(() => {
        if(firstNameRef.current) {
            firstNameRef.current.focus()
        }
    }, [])

    React.useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    React.useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidMatch(password === matchPassword)
    }, [password, matchPassword])

    React.useEffect(() => {
        setErrMsg('')
    }, [email, password, matchPassword])

    const handleCheckBoxChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            const response = await AuthService.registration(email, password, firstName, secondName)
            localStorage.setItem('token', response.data.accessToken)
            setSuccess(true)
        } catch (error) {
            if(error instanceof Error) {
                setErrMsg(error.message)
            }
            else setErrMsg('Unexpected error')
            errRef.current && errRef.current.focus()
        }
    }

    return (
        <Modal title="Регистрация" subtitle="Для того чтобы отслеживать статус вашей заявки, необходимо зарегистрироваться." close={close}>
            <p ref={errRef} className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
            <p className={success ? styles.success : styles.offscreen}>
                Регистрация прошла успешно! Можете <span className={styles.span} onClick={handleSwithchToLogin}>войти в личный кабинет</span>.
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.form__inputs}>
                    <input className={styles.input} ref={firstNameRef} value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="name" placeholder="Имя" />
                    <input className={styles.input} value={secondName} onChange={(e) => setSecondName(e.target.value)} type="text" name="surname" placeholder="Фамилия" />
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
                <button className={styles.btnLight}>Зарегистрироваться<Arrow theme="light"/></button>
            </form>
        </Modal>
    )
}

export default inject('authStore')(observer(Register))