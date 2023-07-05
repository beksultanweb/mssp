import React from "react"
import styles from "./styles.module.scss"
import Arrow from "../../assets/icons/arrow"

export const SimilarHead = ({title, buttonTxt, order, theme}: {title: string, buttonTxt: string, order?: string, theme?: string}) => {
    return (
        <div className={styles.container}>
            <div>
                {order && <span className={`${theme === 'light' && styles.light}`}>{order}</span>}
                <h2 className={`${styles.title} ${theme === 'light' && styles.light}`}>{title}</h2>
            </div>
            {buttonTxt && <button className={`${theme === 'light' ? styles.lightBtn : ''} ${styles.btn}`}>{buttonTxt}<Arrow theme={theme === 'light' ? 'light' : 'dark'}/></button>}
        </div>
    )
}