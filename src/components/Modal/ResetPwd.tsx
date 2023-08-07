import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { useState, useEffect, FormEvent } from 'react'

import Modal from '.'

import styles from './styles.module.scss'

import AuthService from '../../services/auth'
import { AuthStore } from '../../store/AuthStore'
import Button from '../Button'

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const ResetPwd = ({ close, authStore }: {close: () => void, authStore?: AuthStore}) => {
    const [email, setEmail] = useState('')

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setErrMsg('')
    }, [email])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const v1 = EMAIL_REGEX.test(email)
        if (!v1) {
            return
        }
        try {
            const response = await AuthService.resetPwd(email)
            setSuccess(response.data)
            // close()
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
            {success}
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.form__inputs}>
                    <input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" />
                </div>
                <Button className={styles.btnLight} theme='light' txt='Отправить'/>
            </form>
        </Modal>
    )
}

export default inject('authStore')(observer(ResetPwd))