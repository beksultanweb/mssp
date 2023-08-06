import { useState } from 'react'

import Arrow from '../assets/icons/arrow'

const Button = ({ handleConsultationOpen, handleSwithchToRegister, txt, className, theme, handleloginOpen, onClick }: {handleConsultationOpen?: () => void, handleSwithchToRegister?: () => void, txt: string, className?: string, theme: string, handleloginOpen?: () => void, onClick?: () => void}) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <button onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={className} onClick={handleConsultationOpen || handleloginOpen || handleSwithchToRegister}>{txt}<Arrow isHovered={isHovered} theme={theme}/></button>
    )
}

export default Button