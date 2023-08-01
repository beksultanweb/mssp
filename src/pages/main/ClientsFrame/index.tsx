import { graphql, useStaticQuery } from 'gatsby'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useRef } from 'react'

import styles from './styles.module.scss'

import partner5 from '../../../assets/icons/logo/Logo 10.svg'
import partner6 from '../../../assets/icons/logo/Logo 11.svg'
import partner7 from '../../../assets/icons/logo/Logo 12.svg'
import partner8 from '../../../assets/icons/logo/Logo 13.svg'
import partner9 from '../../../assets/icons/logo/Logo 14.svg'
import partner10 from '../../../assets/icons/logo/Logo 15.svg'
import partner11 from '../../../assets/icons/logo/Logo 16.svg'
import partner12 from '../../../assets/icons/logo/Logo 17.svg'
import partner13 from '../../../assets/icons/logo/Logo 5-1.svg'
import partner14 from '../../../assets/icons/logo/Logo 5.svg'
import partner15 from '../../../assets/icons/logo/Logo 6.svg'
import partner16 from '../../../assets/icons/logo/Logo 7.svg'
import partner17 from '../../../assets/icons/logo/Logo 8.svg'
import partner18 from '../../../assets/icons/logo/Logo 9.svg'
import partner1 from '../../../assets/icons/logo/partner.svg'
import partner2 from '../../../assets/icons/logo/partner1.svg'
import partner3 from '../../../assets/icons/logo/partner2.svg'
import partner4 from '../../../assets/icons/logo/partner3.svg'

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
    partner4,
    partner5,
    partner6,
    partner7,
    partner8,
    partner9,
    partner10
]

const partners2 = [
    partner11,
    partner12,
    partner13,
    partner14,
    partner15,
    partner16
]

const partners3 = [
  partner1,
  partner3,
  partner2,
  partner4
]

const partners4 = [
  partner3,
  partner4,
  partner1,
  partner2
]

const ClientsFrame = () => {
    const data = useStaticQuery(query)
    const [counter1, setCounter1] = React.useState({ counter: 0 })
    const [counter2, setCounter2] = React.useState({ counter: 0 })
    const [counter3, setCounter3] = React.useState({ counter: 0 })
    const [counter4, setCounter4] = React.useState({ counter: 0 })

    const ref = useRef<any>([])

    gsap.registerPlugin(ScrollTrigger)
    React.useEffect(() => {
        moveMe()
        moveMe2()
        moveMe3()
        moveMe4()
    }, [])

    const moveMe = () => {
      const tl = gsap.timeline({ repeat: -1, scrollTrigger: {
        trigger: ref.current[0],
        toggleActions: 'play pause resume pause'
      } })
      const dur = 2
      tl.to(ref.current[0], { duration: dur })
      tl.fromTo(ref.current[0], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter1({ counter: 1 }) })
      tl.to(ref.current[0], { alpha: 0 })
      tl.to(ref.current[0], { duration: dur })
      tl.fromTo(ref.current[0], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter1({ counter: 2 }) })
      tl.to(ref.current[0], { alpha: 0 })
      tl.to(ref.current[0], { duration: dur })
      tl.fromTo(ref.current[0], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter1({ counter: 3 }) })
      tl.to(ref.current[0], { alpha: 0 })
      tl.to(ref.current[0], { duration: dur })
      tl.fromTo(ref.current[0], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter1({ counter: 0 }) })
      tl.to(ref.current[0], { alpha: 0 })
    }

    const moveMe2 = () => {
        const tl = gsap.timeline({ repeat: -1, scrollTrigger: {
            trigger: ref.current[1],
            toggleActions: 'play pause resume pause'
          } })
        const dur = 4

        tl.fromTo(ref.current[1], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter2({ counter: 1 }) })
        tl.to(ref.current[1], { alpha: 0 })
        tl.to(ref.current[1], { duration: dur })
        tl.fromTo(ref.current[1], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter2({ counter: 2 }) })
        tl.to(ref.current[1], { alpha: 0 })
        tl.to(ref.current[1], { duration: dur })
        tl.fromTo(ref.current[1], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter2({ counter: 3 }) })
        tl.to(ref.current[1], { alpha: 0 })
        tl.to(ref.current[1], { duration: dur })
        tl.fromTo(ref.current[1], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter2({ counter: 0 }) })
        tl.to(ref.current[1], { alpha: 0 })
        tl.to(ref.current[1], { duration: dur })
    }

    const moveMe3 = () => {
        const tl = gsap.timeline({ repeat: -1, scrollTrigger: {
            trigger: ref.current[2],
            toggleActions: 'play pause resume pause'
          } })
          const dur = 3
        tl.to(ref.current[2], { duration: dur })
        tl.fromTo(ref.current[2], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter3({ counter: 1 }) })
        tl.to(ref.current[2], { alpha: 0 })
        tl.to(ref.current[2], { duration: dur })
        tl.fromTo(ref.current[2], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter3({ counter: 2 }) })
        tl.to(ref.current[2], { alpha: 0 })
        tl.to(ref.current[2], { duration: dur })
        tl.fromTo(ref.current[2], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter3({ counter: 3 }) })
        tl.to(ref.current[2], { alpha: 0 })
        tl.to(ref.current[2], { duration: dur })
        tl.fromTo(ref.current[2], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter3({ counter: 0 }) })
        tl.to(ref.current[2], { alpha: 0 })
    }

    const moveMe4 = () => {
        const tl = gsap.timeline({ repeat: -1, scrollTrigger: {
            trigger: ref.current[3],
            toggleActions: 'play pause resume pause'
          } })
          const dur = 4.5

        tl.fromTo(ref.current[3], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter4({ counter: 1 }) })
        tl.to(ref.current[3], { alpha: 0 })
        tl.to(ref.current[3], { duration: dur })
        tl.fromTo(ref.current[3], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter4({ counter: 2 }) })
        tl.to(ref.current[3], { alpha: 0 })
        tl.to(ref.current[3], { duration: dur })
        tl.fromTo(ref.current[3], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter4({ counter: 3 }) })
        tl.to(ref.current[3], { alpha: 0 })
        tl.to(ref.current[3], { duration: dur })
        tl.fromTo(ref.current[3], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter4({ counter: 0 }) })
        tl.to(ref.current[3], { alpha: 0 })
        tl.to(ref.current[3], { duration: dur })
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
                    <img ref={(el) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners[counter1.counter]} alt="img" />
                    <img ref={(el) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners2[counter2.counter]} alt="img" />
                    <img ref={(el) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners3[counter3.counter]} alt="img" />
                    <img ref={(el) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners4[counter4.counter]} alt="img" />
                </div>
            </Layout>
        </section>
    )
}

export default ClientsFrame