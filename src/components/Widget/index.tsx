import React from 'react'

import styles from './styles.module.scss'

import ico from '../../assets/icons/comment_vs.svg'
import Consultation from '../Modal/Consultation'
import Decipher from '../Modal/Decipher'


const Widget = () => {
    const [decipherOpen, setDecipherOpen] = React.useState(false)
    const [consultationOpen, setConsultationOpen] = React.useState(false)
    const handleDecipherOpen = () => {
        setDecipherOpen(!decipherOpen)
    }
    return (
        <div>
            <div className={styles.widget} onClick={handleDecipherOpen}>
                <img className={styles.widget__ico} src={ico}/>
            </div>
            {decipherOpen && <Decipher close={handleDecipherOpen} handleConsultationOpen={() => setConsultationOpen(true)}/>}
            {consultationOpen && <Consultation close={() => setConsultationOpen(false)}/>}
        </div>
    )
}

export default Widget