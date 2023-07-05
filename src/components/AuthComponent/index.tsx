import React, { useContext, useState } from "react"
import styles from "./styles.module.scss"
import Arrow from "../../assets/icons/arrow"
import { inject, observer } from "mobx-react"
import { AuthStore } from "../../store/AuthStore"

const AuthComponent = ({type, close, authStore}: {type: string, close: () => void, authStore?: AuthStore}) => {
    const [currentType, setCurrentType] = React.useState(type)
    const clickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(event.target === event.currentTarget) {
            close()
        }
    }

    const changeType = () => {
        setCurrentType('Register')
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')

    return (
        <div className={styles.outside} onClick={clickOutside}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{currentType === 'Auth' ? 'Вход' : 'Регистрация'}</h2>
                <p className={styles.subtitle}>{currentType === 'Auth' ? 'Для отслеживания статуса вашей заявки, пожалуйста, войдите в свой личный кабинет.' : 'Для того чтобы отслеживать статус вашей заявки, необходимо зарегистрироваться.'}</p>
                <form>
                    {currentType === 'Register' &&
                    <>
                    <input className={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="name" placeholder="Имя" />
                    <input className={styles.input} value={secondName} onChange={(e) => setSecondName(e.target.value)} type="text" name="surname" placeholder="Фамилия" />
                    </>
                    }
                    <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                    <input className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="pasword" placeholder="Пароль" />
                    {type === 'Register' &&
                    <input className={styles.input} value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} type="password" placeholder="Потвердить пароль" />}
                </form>
                {currentType === 'Auth' &&
                <>
                <div className={styles.flex}>
                    <label><input type="checkbox" name="save" />Запомнить меня</label>
                    <div className={styles.forget}>Забыли пароль?</div>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => authStore?.login(email, password)} className={styles.btnLight}>Войти<Arrow theme="light"/></button>
                    <div className={styles.or}>или</div>
                    <button onClick={changeType} className={styles.btn}>Зарегистрироваться<Arrow theme="dark"/></button>
                </div>
                </>}
                {currentType === 'Register' &&
                <>
                <div className={styles.flex}>
                    <label><input type="checkbox" name="save" />Я принимаю политику конфиденциальности</label>
                </div>
                <button onClick={() => authStore?.registration(email, password)} className={styles.btnLight}>Зарегистрироваться<Arrow theme="light"/></button>
                </>}
            </div>
        </div>
    )
}

export default inject('authStore')(observer(AuthComponent))