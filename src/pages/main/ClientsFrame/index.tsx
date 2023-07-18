import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { gsap } from 'gsap'
import React, { useRef } from 'react'

import styles from './styles.module.scss'

import partner1 from '../../../assets/icons/partner.svg'
import partner2 from '../../../assets/icons/partner1.svg'
import partner3 from '../../../assets/icons/partner2.svg'
import partner4 from '../../../assets/icons/partner3.svg'
import Layout from '../../../components/Layout'


const query = graphql`
{
    wpPage {
      clients {
        client1 {
            sourceUrl
        }
        client2 {
            sourceUrl
        }
        client3 {
            sourceUrl
        }
        client4 {
            sourceUrl
        }
        clientsDescr
        clientsDescr2
        clientsTitle
      }
    }
  }`

const partners = [
    partner1,
    partner2,
    partner3,
    partner4
]

const ClientsFrame = () => {
    const data = useStaticQuery(query)
    const [partner1, setPartner1] = React.useState(0)
    const [partner2, setPartner2] = React.useState(1)
    const [partner3, setPartner3] = React.useState(2)
    const [partner4, setPartner4] = React.useState(3)

    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)

    const handleChange1 = () => {
        gsap.fromTo(ref1.current, {
            opacity: 1
        }, { opacity: 0, ease: 'linear' })
        setTimeout(() => {
            if(partner1 === 3) {
                setPartner1(0)
            }
            else setPartner1((val) => val + 1)
            gsap.fromTo(ref1.current, { opacity: 0 }, { opacity: 1, ease: 'linear' })
        }, 1000)
    }
    const handleChange2 = () => {
        gsap.fromTo(ref2.current, {
            opacity: 1
        }, { opacity: 0, ease: 'linear' })
        setTimeout(() => {
            if(partner2 === 3) {
                setPartner2(0)
            }
            else setPartner2((val) => val + 1)
            gsap.fromTo(ref2.current, { opacity: 0 }, { opacity: 1, ease: 'linear' })
        }, 1000)
    }
    const handleChange3 = () => {
        gsap.fromTo(ref3.current, {
            opacity: 1
        }, { opacity: 0, ease: 'linear' })
        setTimeout(() => {
            if(partner3 === 3) {
                setPartner3(0)
            }
            else setPartner3((val) => val + 1)
            gsap.fromTo(ref3.current, { opacity: 0 }, { opacity: 1, ease: 'linear' })
        }, 1000)
    }
    const handleChange4 = () => {
        gsap.fromTo(ref4.current, {
            opacity: 1
        }, { opacity: 0, ease: 'linear' })
        setTimeout(() => {
            if(partner4 === 3) {
                setPartner4(0)
            }
            else setPartner4((val) => val + 1)
            gsap.fromTo(ref4.current, { opacity: 0 }, { opacity: 1, ease: 'linear' })
        }, 1000)
    }

    return (
        <section className={styles.clients}>
            <Layout>
                <div className={styles.about__content}>
                    <div>
                        <span>/006</span>
                        <h2 className={styles.title}>{data.wpPage.clients.clientsTitle}</h2>
                    </div>
                    <div>
                        <div className={styles.about}>{data.wpPage.clients.clientsDescr}</div>
                        <div className={styles.paragraph}>{data.wpPage.clients.clientsDescr2}</div>
                    </div>
                </div>
                <div className={styles.partners}>
                    <img ref={ref1} onClick={handleChange1} className={styles.partners__item} src={partners[partner1]} alt="img" />
                    <img ref={ref2} onClick={handleChange2} className={styles.partners__item} src={partners[partner2]} alt="img" />
                    <img ref={ref3} onClick={handleChange3} className={styles.partners__item} src={partners[partner3]} alt="img" />
                    <img ref={ref4} onClick={handleChange4} className={styles.partners__item} src={partners[partner4]} alt="img" />
                </div>
            </Layout>
        </section>
    )
}

export default ClientsFrame