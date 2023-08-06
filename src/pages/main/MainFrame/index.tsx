import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRef, useLayoutEffect } from 'react'

import styles from './styles.module.scss'

import Button from '../../../components/Button'
import Layout from '../../../components/Layout'


const fetchMainBlockData = graphql`
{
    wpPage {
        homePage {
        fieldGroupName
        mainBtn
        mainSubtitle
        mainTitle
        }
    }
}`

const MainFrame = ({ handleConsultationOpen }: {handleConsultationOpen: () => void}) => {
    const data = useStaticQuery(fetchMainBlockData)
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    if(typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
        useLayoutEffect(() => {
            if(window.innerWidth >= 600) {
            gsap.fromTo(ref1.current,
                { y: 800 }, { x: -10, y: 600, repeat: -1, yoyo: true, duration: 5, scrollTrigger: {
                    trigger: ref3.current,
                    start: 'bottom bottom'
                } })
            gsap.fromTo(ref2.current,
                { x: 0, y: 0 }, { x: -100, y: -20, repeat: -1, yoyo: true, duration: 5, scrollTrigger: {
                    trigger: ref2.current
                } })
            gsap.fromTo(ref3.current,
                { x: 0, y: 640 }, { x: +100, y: 650, repeat: -1, yoyo: true, duration: 5, scrollTrigger: {
                    trigger: ref2.current
                } })
            }
        }, [])
    }
    return (
        <div>
        <div ref={ref1}>
            <StaticImage
            src="../../../assets/images/021A5938.jpg"
            width={344}
            height={393}
            alt="bgphoto"
            imgStyle={{ borderRadius: '24px' }}
            className={styles.main3}
            />
        </div>
        <div ref={ref2}>
            <StaticImage
            src="../../../assets/images/keypad.jpg"
            width={313}
            height={234}
            alt="bgphoto"
            imgStyle={{ borderRadius: '24px' }}
            className={styles.main1}
            />
        </div>
        <div ref={ref3}>
            <StaticImage
            src="../../../assets/images/man.jpg"
            width={256}
            height={319}
            alt="bgphoto"
            imgStyle={{ borderRadius: '24px' }}
            className={styles.main2}
            />
        </div>
        <Layout>
            <h1>{data.wpPage.homePage.mainTitle}</h1>
            <span>/001</span><p className={styles.paragraph}>{data.wpPage.homePage.mainSubtitle}</p>
            <Button handleConsultationOpen={handleConsultationOpen} txt={data.wpPage.homePage.mainBtn} theme='dark'/>
        </Layout>
        </div>
    )
}

export default MainFrame