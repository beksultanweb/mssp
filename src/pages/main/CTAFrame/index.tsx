import { graphql, useStaticQuery } from 'gatsby'
import React, { useRef } from 'react'

import styles from './styles.module.scss'

import Arrow from '../../../assets/icons/arrow'
import Layout from '../../../components/Layout'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from '../../../components/Button'

const query = graphql`
{
    wpPage {
      ctaframe {
        ctabutton
        ctasubtitle
        ctatitle
      }
    }
  }`

const CTAFrame = ({ setDecipherOpen, handleConsultationOpen }: {setDecipherOpen: () => void, handleConsultationOpen: () => void}) => {
    const data = useStaticQuery(query)
    const ref = useRef(null)
    React.useEffect(() => {
      gsap.registerPlugin(ScrollTrigger)
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: 'center center',
          onEnter: () => {
            setDecipherOpen(true)
          },
          onEnterBack: () => {
            setDecipherOpen(true)
          },
          onLeave: () => {
            setDecipherOpen(false)
          },
          onLeaveBack: () => {
            setDecipherOpen(false)
          }
        }
      })
    }, [])
    return (
        <section ref={ref} className={styles.calltoaction}>
        <Layout>
            <h2 className={styles.calltoaction__title}>{data.wpPage.ctaframe.ctatitle}</h2>
            <p className={styles.calltoaction__subtitle}>{data.wpPage.ctaframe.ctasubtitle}</p>
            <Button handleConsultationOpen={handleConsultationOpen} className={styles.calltoaction__btn} theme='dark' txt={data.wpPage.ctaframe.ctabutton}/>
        </Layout>
        </section>
    )
}

export default CTAFrame