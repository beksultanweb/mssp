import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

import styles from './styles.module.scss'

import Arrow from '../../../assets/icons/arrow'
import mainPhoto from '../../../assets/images/main3.png'
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

const MainFrame = () => {
    const data = useStaticQuery(fetchMainBlockData)
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    if(typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
        React.useEffect(() => {
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
            src="../../../assets/images/main3.png"
            alt="bgphoto"
            className={styles.main3}
            />
        </div>
        <div ref={ref2}>
            <StaticImage
            src="../../../assets/images/main1.png"
            alt="bgphoto"
            className={styles.main1}
            />
        </div>
        <div ref={ref3}>
            <StaticImage
            src="../../../assets/images/main2.png"
            alt="bgphoto"
            className={styles.main2}
            />
        </div>
        <Layout>
            <h1>{data.wpPage.homePage.mainTitle}</h1>
            <span>/001</span><p className={styles.paragraph}>{data.wpPage.homePage.mainSubtitle}</p>
            <button>{data.wpPage.homePage.mainBtn}<Arrow theme="dark"/></button>
        </Layout>
        </div>
    )
}

export default MainFrame