import { FC, MouseEvent, ReactNode } from 'react'

import styles from './styles.module.scss'

interface ModalProps {
    title?: string
    subtitle?: string
    close: () => void
    children: ReactNode,
    width?: number
    justifyEnd?: boolean,
    bgColor?: string
}

const Modal: FC<ModalProps> = ({ title, subtitle, close, children, width, justifyEnd, bgColor }) => {
    const clickOutside = (event: MouseEvent<HTMLDivElement>) => {
        if(event.target === event.currentTarget) {
            close()
        }
    }

    return (
        <div className={styles.outside} onClick={clickOutside} style={{ alignItems: `${justifyEnd && 'end'}` }}>
            <div className={styles.modal} style={{ width: `${width}px`, margin: `${justifyEnd && '0 5% 10% auto'}`, backgroundColor: `${bgColor}` }}>
                <div onClick={close} className={styles.close}></div>
                {title && <h2 className={styles.title}>{title}</h2>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                {children}
            </div>
        </div>
    )
}

export default Modal