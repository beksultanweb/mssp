import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { useState, useEffect, FormEvent } from 'react'

import Modal from '.'

import styles from './styles.module.scss'

import AuthService from '../../services/auth'
import { AuthStore } from '../../store/AuthStore'
import Button from '../Button'
import { navigate } from 'gatsby'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const NewPwd = ({ userId, token }: { userId: string, token: string }) => {
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        setErrMsg('')
    }, [password])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const v1 = PWD_REGEX.test(password)
        if (!v1) {
            return
        }
        try {
            const response = await AuthService.newPwd(userId, token, password)
            setSuccess(true)
            navigate('/')
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                setErrMsg(error.response.data.message)
            }
            else setErrMsg('Unexpected error')
        }
    }

    return (
        <Modal title="Изменение пароля" subtitle="Чтобы новый пароль вступил в силу, отправьте новый пароль на сервер." position={true}>
            <p className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
            <p className={success ? styles.success : styles.offscreen}>
            Пароль успешно изменен.
            </p>
            <form onSubmit={handleSubmit}>
                <div className={styles.form__inputs}>
                    <input className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder="Новый пароль" />
                </div>
                <Button className={styles.btnLight} theme='light' txt='Изменить пароль'/>
            </form>
        </Modal>
    )
}

export default inject('authStore')(observer(NewPwd))