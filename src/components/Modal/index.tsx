import React from 'react'

import styles from './styles.module.scss'

interface ModalProps {
    title: string
    subtitle: string
    close: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ title, subtitle, close, children }) => {
    const clickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(event.target === event.currentTarget) {
            close()
        }
    }

    return (
        <div className={styles.outside} onClick={clickOutside}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
                {children}
            </div>
        </div>
    )
}

export default Modal