import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import styles from './styles.module.scss'

import Layout from '../../../components/Layout'
import { StaticImage } from 'gatsby-plugin-image'


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

const ClientsFrame = () => {
    const data = useStaticQuery(query)
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
                    <StaticImage className={styles.partners__item} src="../../../assets/icons/partner.svg" alt="img" />
                    <StaticImage className={styles.partners__item} src="../../../assets/icons/partner1.svg" alt="img" />
                    <StaticImage className={styles.partners__item} src="../../../assets/icons/partner2.svg" alt="img" />
                    <StaticImage className={styles.partners__item} src="../../../assets/icons/partner3.svg" alt="img" />
                </div>
            </Layout>
        </section>
    )
}

export default ClientsFrame