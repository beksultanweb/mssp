import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import React from 'react'

import styles from './styles.module.scss'

import Button from '../Button'
import Layout from '../Layout'


interface PartnerLinkProps {
    image: IGatsbyImageData
    title: string
    description: string
    btn: string
    link: string
  }

const PartnerLink = (props: PartnerLinkProps) => {
    const { image, title, description, link, btn } = props
    return (
        <Layout>
            <div className={styles.partner}>
                {image && <GatsbyImage className={styles.img} image={image} alt="partner_link" />}
                <div className={styles.partner__content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.paragraph}>{description}</p>
                    <a href={link} className={styles.link}>
                        <Button txt={btn} theme='light' className={styles.btn}/>
                    </a>
                </div>
            </div>
        </Layout>
    )
}

export default PartnerLink