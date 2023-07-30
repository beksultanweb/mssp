import { graphql, useStaticQuery } from 'gatsby'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

const partners2 = [
    partner4,
    partner2,
    partner1,
    partner3
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
    const [counter, setCounter] = React.useState({ counter: 0 })

    const ref = useRef<HTMLImageElement[]>([])

    gsap.registerPlugin(ScrollTrigger)
    React.useEffect(() => {
        ref.current.forEach((el: HTMLImageElement) => moveMe(el))
    }, [])
    const dur = gsap.utils.random(2, 3)
    
    const moveMe = (element: HTMLImageElement) => {
      const tl = gsap.timeline({ repeat: -1, scrollTrigger: {
        trigger: ref.current,
        toggleActions: 'play pause resume pause'
      } })

      // tl.to(element, { duration: dur })
      tl.to(element, { alpha: 1 })
      tl.to(element, { alpha: 0 })
      tl.to(element, { duration: gsap.utils.random([2, 2.25], true) })
      tl.fromTo(element, { alpha: 0 }, { alpha: 1, ease: 'power2.out', duration: 5, onStart: () => setCounter({ counter: 1 }) })
      // tl.to({ counter: 0 }, {
      //   duration: 3,
      //   onUpdate: ,
      //   onUpdateParams: [{ counter: 1 }]
      // });
      tl.to(element, { alpha: 0 })
      tl.to(element, { duration: 2 })
      // tl.to(element, { alpha: 1, duration: durT })
      tl.fromTo(element, { alpha: 0 }, { alpha: 1, ease: 'power2.out', duration: 5, onStart: () => setCounter({ counter: 2 }) })
      tl.to(element, { alpha: 0 })
      tl.to(element, { duration: 2 })
      // tl.to(element, { alpha: 1, duration: durT })
      tl.fromTo(element, { alpha: 0 }, { alpha: 1, ease: 'power2.out', duration: 5, onStart: () => setCounter({ counter: 3 }) })
      tl.to(element, { alpha: 0 })
      tl.to(element, { duration: 2 })
      // tl.to(element, { alpha: 1, duration: durT })
      tl.fromTo(element, { alpha: 0 }, { alpha: 1, ease: 'power2.out', duration: 5, onStart: () => setCounter({ counter: 0 }) })
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
                    <img ref={(el: HTMLImageElement) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners[counter.counter]} alt="img" />
                    <img ref={(el: HTMLImageElement) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners2[counter.counter]} alt="img" />
                    <img ref={(el: HTMLImageElement) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners3[counter.counter]} alt="img" />
                    <img ref={(el: HTMLImageElement) => !ref.current.includes(el) && ref.current.push(el)} className={styles.partners__item} src={partners4[counter.counter]} alt="img" />
                </div>
            </Layout>
        </section>
    )
}

export default ClientsFrame