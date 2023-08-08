import { graphql, useStaticQuery } from 'gatsby'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useState, useRef, useLayoutEffect } from 'react'

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
import partner19 from '../../../assets/icons/logo/Logo 18.svg'
import partner20 from '../../../assets/icons/logo/Logo 19.svg'
import partner21 from '../../../assets/icons/logo/Logo 20.svg'
import partner22 from '../../../assets/icons/logo/Logo 21.svg'
import partner23 from '../../../assets/icons/logo/Logo 22.svg'
import partner24 from '../../../assets/icons/logo/Logo 23.svg'
import partner25 from '../../../assets/icons/logo/Logo 24.svg'
import partner26 from '../../../assets/icons/logo/Logo 25.svg'
import partner27 from '../../../assets/icons/logo/Logo 26.svg'
import partner28 from '../../../assets/icons/logo/Logo 27.svg'
import partner29 from '../../../assets/icons/logo/Logo 28.svg'
import partner30 from '../../../assets/icons/logo/Logo 29.svg'
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
    partner7
]

const partners2 = [
    partner11,
    partner12,
    partner13,
    partner14,
    partner15,
    partner16,
    partner17
]

const partners3 = [
  partner21,
  partner22,
  partner23,
  partner24,
  partner25,
  partner26,
  partner27,
  partner30
]

const partners4 = [
  partner8,
  partner9,
  partner10,
  partner18,
  partner19,
  partner20,
  partner28,
  partner29
]

const ClientsFrame = () => {
    const data = useStaticQuery(query)
    const [counter1, setCounter1] = useState(0)
    const [counter2, setCounter2] = useState(0)
    const [counter3, setCounter3] = useState(0)
    const [counter4, setCounter4] = useState(0)

    const ref = useRef<any>([])

    gsap.registerPlugin(ScrollTrigger)
    useLayoutEffect(() => {
        moveMe()
        moveMe2()
        moveMe3()
        moveMe4()
    }, [])

    const moveMe = () => {
      const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random([0, 3]), scrollTrigger: {
        trigger: ref.current[0],
        toggleActions: 'play pause resume pause'
      } })
      const dur = 2

      tl.fromTo(ref.current[0], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter1((prev) => {
        if(prev === partners.length - 1) return 0
        return prev + 1
      }) })
      tl.to(ref.current[0], { alpha: 0 })
      tl.to(ref.current[0], { duration: dur })
    }

    const moveMe2 = () => {
        const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random([0, 3]), scrollTrigger: {
            trigger: ref.current[1],
            toggleActions: 'play pause resume pause'
          } })
        const dur = 3.25

        tl.fromTo(ref.current[1], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter2((prev) => {
          if(prev === partners2.length - 1) return 0
          return prev + 1
        }) })
        tl.to(ref.current[1], { alpha: 0 })
        tl.to(ref.current[1], { duration: dur })
    }

    const moveMe3 = () => {
        const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random([0, 3]), scrollTrigger: {
            trigger: ref.current[2],
            toggleActions: 'play pause resume pause'
          } })
        const dur = 2.5

        tl.fromTo(ref.current[2], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter3((prev) => {
          if(prev === partners3.length - 1) return 0
          return prev + 1
        }) })
        tl.to(ref.current[2], { alpha: 0 })
        tl.to(ref.current[2], { duration: dur })
    }

    const moveMe4 = () => {
        const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random([0, 3]), scrollTrigger: {
            trigger: ref.current[3],
            toggleActions: 'play pause resume pause'
          } })
        const dur = 4

        tl.fromTo(ref.current[3], { alpha: 0 }, { alpha: 1, ease: 'power3.out', duration: 5, onStart: () => setCounter4((prev) => {
          if(prev === partners2.length - 1) return 0
          return prev + 1
        }) })
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
                    <img ref={(el) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners[counter1]} alt="img" />
                    <img ref={(el) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners2[counter2]} alt="img" />
                    <img ref={(el) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners3[counter3]} alt="img" />
                    <img ref={(el) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners4[counter4]} alt="img" />
                </div>
            </Layout>
        </section>
    )
}

export default ClientsFrame