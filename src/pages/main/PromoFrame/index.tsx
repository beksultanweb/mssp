import React from "react"
import Arrow from "../../../assets/icons/arrow"
import Layout from "../../../components/Layout"
import styles from "./styles.module.scss"
import productStyles from "../ProductsFrame/styles.module.scss"
import {graphql, useStaticQuery} from "gatsby"
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image"

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
    const {promoTitle, promoSubtitle, promoBtn, promoLink, promoImg} = data.wpPage.promo
    const image = getImage(promoImg)

    return (
        <section className={styles.promo}>
            <Layout>
                <div className={styles.content}>
                    <h2 className={`${productStyles.white_text} ${styles.title}`}>{promoTitle}</h2>
                    <p className={`${productStyles.white_text} ${styles.paragraph}`}>{promoSubtitle}</p>
                    <a className={styles.link} href={promoLink}><button className={productStyles.tabs__btn}>{promoBtn}<Arrow theme="light"/></button></a>
                </div>
            </Layout>
            {image && <GatsbyImage className={styles.img} image={image} alt="img" />}
        </section>
    )
}

export default PromoFrame