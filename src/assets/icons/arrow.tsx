import { gsap } from 'gsap';
import * as React from 'react'
import { SVGProps } from 'react'

interface ArrowProps extends SVGProps<SVGSVGElement> {
  theme?: string
  rotate?: number
  isHovered?: boolean
}

const Arrow = (props: ArrowProps) => {
  const { theme, rotate, isHovered, ...svgProps } = props
  const ref = React.useRef(null)

  React.useEffect(() => {
    if(isHovered && !rotate) {
      gsap.fromTo(ref.current, {
        x: 0, y: 0
      }, { x: +10, y: -10, onComplete: function() {gsap.set(ref.current, { x: 0, y: 0 }) } } )
    }
  }, [isHovered])

  return (
    <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...svgProps}
    style={{ transform: `rotate(${rotate ? rotate : 0}deg)` }}
  >
    <path
      stroke={theme === 'dark' ? '#fff' : theme === 'light' ? '#1a1a1a' : ''}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 11.833 11.833 1m0 0v10.4m0-10.4h-10.4"
    />
  </svg>
  )
}
export default Arrow
