import styles from './styles.module.scss'

import ico from '../../assets/icons/warning_outlined.svg'


const Widget = ({ handleDecipherOpen }: {handleDecipherOpen: () => void}) => {
    return (
        <div>
            <div className={styles.widget} onClick={handleDecipherOpen}>
                <img className={styles.widget__ico} src={ico}/>
            </div>
        </div>
    )
}

export default Widget