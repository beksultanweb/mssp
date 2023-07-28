import React from 'react'

import Modal from '.'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import ico from '../../assets/icons/decipher.svg'



const Decipher = ({ close, handleConsultationOpen }: {close: () => void, handleConsultationOpen: () => void }) => {
    const handleConsult = () => {
        handleConsultationOpen()
        close()
    }
    return (
        <Modal close={close} width={256} justifyEnd={true} bgColor={'#142C40'}>
            <div className={styles.decipher__title} style={{ marginBottom: '10px' }}><img src={ico} />Привет!</div>
            <div className={styles.decipher__title}>Нужно сообщить<br/>об инциденте?</div>
            <p className={styles.decipher__subtitle}>Зашифровали 1С?<br/>Мы поможем без выплаты<br/>выкупа!</p>
            <button onClick={handleConsult} className={styles.btnLight}>Консультация<Arrow theme='light'/></button>
        </Modal>
    )
}

export default Decipher