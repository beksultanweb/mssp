import axios from 'axios'
import { inject, observer } from 'mobx-react'
import React from 'react'

import Modal from '.'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import info from '../../assets/icons/info-circle.svg'
import RequestsService from '../../services/requests'
import { RequestsStore } from '../../store/RequestsStore'

const PHONE_REGEX = /^\+?[0-9]{1,3}-?[0-9]{1,}-?[0-9]{1,}$/

const CreateRequest = ({ close, requestsStore }: {close: () => void, requestsStore?: RequestsStore}) => {
    const emailRef: React.LegacyRef<HTMLInputElement> = React.useRef(null)

    const [domain, setDomain] = React.useState('')
    const [validDomain, setValidDomain] = React.useState(false)

    const [phone, setPhone] = React.useState('')
    const [validPhone, setValidPhone] = React.useState(false)

    const [service, setService] = React.useState('')

    const [errMsg, setErrMsg] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [checkRun, setCheckRun] = React.useState(false);

    React.useEffect(() => {
        if(emailRef.current) {
            emailRef.current.focus()
        }
    }, [])

    React.useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    React.useEffect(() => {
        setErrMsg('')
    }, [phone])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await RequestsService.createRequest(service, domain, phone)
            setSuccess(true)
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                setErrMsg(error.response.data.message)
            }
            else setErrMsg('Unexpected error')
        }
    }

    return (
        <Modal title="Заявка" subtitle="Предоставьте данные и следите за статусом заявки в Личном кабинете." close={close}>
            <p className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
            <p className={success ? styles.success : styles.offscreen}>Успешно загружено</p>
            <form onSubmit={handleSubmit}>
                <div className={styles.form__inputs}>
                    <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" name="phone" placeholder="Номер телефона" />
                    <p className={!phone && checkRun ? styles.instructions : styles.offscreen}>
                        <img src={info} alt="" />Номер телефона обязателен к заполнению
                    </p>
                    <p id="emailnote" className={phone && !validPhone ? styles.instructions : styles.offscreen}>
                        <img src={info} alt="" />Неверный номер телефона
                    </p>
                    <input className={styles.input} value={service} onChange={(e) => setService(e.target.value)} type="text" placeholder="Выбранная услуга (общая)" />
                    <input className={styles.input} value={domain} onChange={(e) => setDomain(e.target.value)} type="text" placeholder="Доменный адрес" />
                </div>
                <button className={styles.btnLight}>Отправить<Arrow theme="light"/></button>
            </form>
        </Modal>
    )
}

export default inject('authStore', 'requestsStore')(observer(CreateRequest))