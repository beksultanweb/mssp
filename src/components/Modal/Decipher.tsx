import { graphql, useStaticQuery } from 'gatsby'

import Modal from '.'

import styles from './styles.module.scss'

import ico from '../../assets/icons/decipher.svg'
import Button from '../Button'


// const query = graphql`query {
//     wpPage {
//       decipher {
//         decipherSubtitle
//         decipherTitle
//       }
//     }
//   }`

const Decipher = ({ close, handleConsultationOpen }: {close: () => void, handleConsultationOpen: () => void }) => {
    // const data = useStaticQuery(query)
    const handleConsult = () => {
        close()
        handleConsultationOpen()
    }
    return (
        <Modal close={close} width={256} justifyEnd={true} bgColor={'#142C40'} removeScroll={false}>
            <div className={styles.decipher__title} style={{ marginBottom: '10px' }}><img src={ico} />Привет!</div>
            <div className={styles.decipher__title}>Нужно сообщить об инциденте?</div>
            <p className={styles.decipher__subtitle}>Зашифровали 1С? Мы поможем без выплаты выкупа!</p>
            <Button className={styles.btnLight} handleConsultationOpen={handleConsult} txt='Консультация' theme='light'/>
        </Modal>
    )
}

export default Decipher