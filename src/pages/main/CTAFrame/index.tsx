import React from "react"
import Layout from "../../../components/Layout"
import Arrow from "../../../assets/icons/arrow"
import styles from "./styles.module.scss"
import { graphql, useStaticQuery } from "gatsby"

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

const CTAFrame = () => {
    const data = useStaticQuery(query)
    return (
        <section className={styles.calltoaction}>
        <Layout>
            <h2 className={styles.calltoaction__title}>{data.wpPage.ctaframe.ctatitle}</h2>
            <p className={styles.calltoaction__subtitle}>{data.wpPage.ctaframe.ctasubtitle}</p>
            <button className={styles.calltoaction__btn}>{data.wpPage.ctaframe.ctabutton}<Arrow theme="dark"/></button>
        </Layout>
        </section>
    )
}

export default CTAFrame