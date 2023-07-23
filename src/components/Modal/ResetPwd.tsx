import axios from 'axios'
import { navigate } from 'gatsby'
import { inject, observer } from 'mobx-react'
import React from 'react'

import Modal from '.'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import info from '../../assets/icons/info-circle.svg'
import AuthService from '../../services/auth'
import { AuthStore } from '../../store/AuthStore'

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const ResetPwd = ({ close, authStore }: {close: () => void, authStore?: AuthStore}) => {
    const [email, setEmail] = React.useState('')

    const [errMsg, setErrMsg] = React.useState('');
    const [success, setSuccess] = React.useState('');

    React.useEffect(() => {
        setErrMsg('')
    }, [email])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const v1 = EMAIL_REGEX.test(email)
        if (!v1) {
            return
        }
        try {
            const response = await AuthService.resetPwd(email)
            close()
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                setErrMsg(error.response.data.message)
            }
            else setErrMsg('Unexpected error')
        }
    }

    return (
        <Modal title="Сброс пароля" subtitle="Для сброса пароля мы отправим письмо с ссылкой на эту почту." close={close}>
            <p className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
            <p className={success ? styles.success : styles.offscreen}>
            Письмо успешно отправлено.
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.form__inputs}>
                    <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                </div>
                <button className={styles.btnLight}>Отправить<Arrow theme="light"/></button>
            </form>
        </Modal>
    )
}

export default inject('authStore')(observer(ResetPwd))