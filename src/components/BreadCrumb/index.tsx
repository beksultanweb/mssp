import { Link } from 'gatsby'
import React from 'react'

import styles from './styles.module.scss'

interface Props {
    parent: string
    current: string
    className: string
}

const BreadCrumb = (props: Props) => {
    const { parent, current, className } = props

    return (
        <div className={className}>
            <Link to="/" className={styles.link}>
                <span className={styles.white_text}>Главная</span>
            </Link>
            <span className={styles.white_text}>/</span>
            <span className={styles.white_text}>Продукты и услуги</span>
            <span className={styles.white_text}>/</span>
            <span className={styles.white_text}>{parent && parent}</span>
            <span className={styles.white_text}>/</span>
            <span className={`${styles.white_text} ${styles.current}`}>{current}</span>
        </div>
    )
}

export default BreadCrumb