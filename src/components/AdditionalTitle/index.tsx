import { Link } from 'gatsby'
import React from 'react'

import styles from './styles.module.scss'

import Button from '../Button'

export const SimilarHead = ({ title, buttonTxt, order, theme }: {title: string, buttonTxt: string, order?: string, theme?: string}) => {
    return (
        <div className={styles.container}>
            <div>
                {order && <span className={`${theme === 'light' && styles.light}`}>{order}</span>}
                <h2 className={`${styles.title} ${theme === 'light' && styles.light}`}>{title}</h2>
            </div>
            {buttonTxt &&
            <Link to={'/news'} className={styles.link}><Button className={`${theme === 'light' ? styles.lightBtn : ''} ${styles.btn}`} txt={buttonTxt} theme={theme === 'light' ? 'light' : 'dark'}/></Link>}
        </div>
    )
}