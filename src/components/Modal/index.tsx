import React from 'react'

import styles from './styles.module.scss'

interface ModalProps {
    title?: string
    subtitle?: string
    close: () => void
    children: React.ReactNode,
    width?: number
    justifyEnd?: boolean
}

const Modal: React.FC<ModalProps> = ({ title, subtitle, close, children, width, justifyEnd }) => {
    const clickOutside = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if(event.target === event.currentTarget) {
            close()
        }
    }

    return (
        <div className={styles.outside} onClick={clickOutside} style={{ alignItems: `${justifyEnd && 'end'}` }}>
            <div className={styles.modal} style={{ width: `${width}px`, margin: `${justifyEnd && '0 5% 10% auto'}` }}>
                <div onClick={close} className={styles.close}></div>
                {title && <h2 className={styles.title}>{title}</h2>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                {children}
            </div>
        </div>
    )
}

export default Modal