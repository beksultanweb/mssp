import axios from 'axios'
import { inject, observer } from 'mobx-react'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

import { RemoveScroll } from 'react-remove-scroll'

import Modal from '.'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import info from '../../assets/icons/info-circle.svg'
import RequestsService from '../../services/requests'
import { RequestsStore } from '../../store/RequestsStore'

import Button from '../Button'

const PHONE_REGEX = /^\+?[0-9]{1,3}-?[0-9]{1,}-?[0-9]{1,}$/

const Consultation = ({ close, requestsStore }: {close: () => void, requestsStore?: RequestsStore}) => {
    const [company, setCompany] = useState('')
    const [phone, setPhone] = useState('')
    const [validPhone, setValidPhone] = useState(false)

    const [checkboxChecked, setCheckboxChecked] = useState(false)
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [checkRun, setCheckRun] = useState(false);

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone))
    }, [phone])

    useEffect(() => {
        setErrMsg('')
    }, [phone])

    const handleCheckBoxChecked = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked) {
            setCheckboxChecked(true)
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setCheckRun(true)
        const v1 = PHONE_REGEX.test(phone)
        if (!v1 || !checkboxChecked) {
            return
        }
        try {
            // const response = await RequestsService.createRequest(service, domain, phone)
            // setSuccess(true)
        } catch (error) {
            if(axios.isAxiosError(error) && error.response) {
                setErrMsg(error.response.data.message)
            }
            else setErrMsg('Unexpected error')
        }
    }

    return (
        <RemoveScroll enabled>
            <Modal title="Консультация" subtitle="Оставляйте заявку на консультацию, мы поможем выявить решение" close={close}>
                <p className={errMsg ? styles.errmsg : styles.offscreen}>{errMsg}</p>
                <p className={success ? styles.success : styles.offscreen}>Заявка успешно отправлена</p>
                <form onSubmit={handleSubmit}>
                    <div className={styles.form__inputs}>
                        <input className={styles.input} value={company} onChange={(e) => setCompany(e.target.value)} type="text" placeholder="Название компании" />
                        <input className={styles.input} value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" name="phone" placeholder="Номер телефона" />
                        <p className={!phone && checkRun ? styles.instructions : styles.offscreen}>
                            <img src={info} alt="" />Номер телефона обязателен к заполнению
                        </p>
                        <p id="emailnote" className={phone && !validPhone ? styles.instructions : styles.offscreen}>
                            <img src={info} alt="" />Неверный номер телефона
                        </p>
                    </div>
                    <div className={styles.flex}>
                        <label><input onChange={handleCheckBoxChecked} type="checkbox" name="save" />Я принимаю политику конфиденциальности</label>
                    </div>
                    <p className={validPhone && !checkboxChecked ? styles.instructions : styles.offscreen}>Чтобы зарегистрироваться, примите политику конфиденциальности</p>
                    <Button className={styles.btnLight} txt='Отправить' theme='light'/>
                </form>
            </Modal>
        </RemoveScroll>
    )
}

export default inject('authStore', 'requestsStore')(observer(Consultation))