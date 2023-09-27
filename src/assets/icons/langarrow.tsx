import * as React from 'react'
import { SVGProps } from 'react'

interface LangArrowProps extends SVGProps<SVGSVGElement> {
  theme?: string
  rotate?: boolean
}

const LangArrow = (props: LangArrowProps) => {
  const { theme, rotate, ...svgProps } = props

  return (
    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" style={rotate ? { transform: 'rotate(180deg)' } : {}} {...svgProps}>
        <path d="M5 7.66064L10 12.6606L15 7.66064" stroke={theme === 'light' ? '#fff' : '#1a1a1a'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
export default LangArrow
