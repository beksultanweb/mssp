import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData, StaticImage } from 'gatsby-plugin-image'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useRef } from 'react'

import styles from './styles.module.scss'

import Arrow from '../../../assets/icons/arrow'
import Layout from '../../../components/Layout'


const query = graphql`
{
    wpPage {
      promo {
        promoBtn
        promoImg {
          gatsbyImage(width: 483, formats: WEBP)
        }
        promoLink
        promoSubtitle
        promoTitle
      }
    }
  }`

interface PromoProps {
  wpPage: {
    promo: {
      promoBtn: string
      promoImg: {
        gatsbyImage: IGatsbyImageData
      }
      promoLink: string
      promoTitle: string
      promoSubtitle: string
    }
  }
}

const PromoFrame = () => {
    const data: PromoProps = useStaticQuery(query)
    const { promoTitle, promoSubtitle, promoBtn, promoLink, promoImg } = data.wpPage.promo
    const image = getImage(promoImg)
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    gsap.registerPlugin(MotionPathPlugin)
    gsap.to(ref2.current, {
      repeat: -1,
      ease: 'none',
      duration: 10,
      motionPath: 'm 1.000003,76.015001 a 75.000001,75.000001 0 1 1 149.999997,0 75.000001,75.000001 0 1 1 -149.999997,0 m 74.999999,0'
    })

    return (
      <section className={styles.promo}>
        <div ref={ref1}><StaticImage  className={styles.svg} src="../../../assets/icons/Linergradient.png" alt=""/></div>
        <div ref={ref2}><StaticImage className={styles.svg} src="../../../assets/icons/Ellipse18.png" alt=""/></div>
        <Layout>
            <div className={styles.content}>
                <h2 className={styles.title}>{promoTitle}</h2>
                <p className={styles.paragraph}>{promoSubtitle}</p>
                <a className={styles.link} href={promoLink}><button className={styles.btn}>{promoBtn}<Arrow theme="light"/></button></a>
            </div>
        </Layout>
        {image && <GatsbyImage className={styles.img} image={image} alt="img" />}
      </section>
    )
}

export default PromoFrame