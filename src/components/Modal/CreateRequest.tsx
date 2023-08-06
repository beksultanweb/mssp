import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { useState, useRef, useEffect, LegacyRef, FormEvent } from 'react'

import Modal from '.'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import info from '../../assets/icons/info-circle.svg'
import RequestsService from '../../services/requests'
import { RequestsStore } from '../../store/RequestsStore'
import Button from '../Button'

const PHONE_REGEX = /^\+?[0-9]{1,3}-?[0-9]{1,}-?[0-9]{1,}$/

const CreateRequest = ({ close, requestsStore }: {close: () => void, requestsStore?: RequestsStore}) => {
    const emailRef: LegacyRef<HTMLInputElement> = useRef(null)

    const [domain, setDomain] = useState('')
    const [validDomain, setValidDomain] = useState(false)

    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false)

    const [service, setService] = useState('')

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [checkRun, setCheckRun] = useState(false);

    useEffect(() => {
        if(emailRef.current) {
            emailRef.current.focus()
        }
    }, [])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    useEffect(() => {
        setErrMsg('')
    }, [phone])

    const handleSubmit = async (e: FormEvent) => {
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
                    <select className={styles.input} value={service} onChange={(e) => setService(e.target.value)}>
                        <option value="" disabled selected>Выбранная услуга (общая)</option>
                        <option value="Dodger">Dodger</option>
                        <option value="Sentest">Sentest</option>
                        <option value="Дешифратор">Дешифратор</option>
                    </select>
                    <input className={styles.input} value={domain} onChange={(e) => setDomain(e.target.value)} type="text" placeholder="Доменный адрес" />
                </div>
                <Button txt='Отправить' className={styles.btnLight} theme='light'/>
            </form>
        </Modal>
    )
}

export default inject('authStore', 'requestsStore')(observer(CreateRequest))