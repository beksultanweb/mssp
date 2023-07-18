import { Link } from 'gatsby'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

import styles from './styles.module.scss'

import FbIconDark from '../../assets/icons/fb-dark.svg'
import FbIcon from '../../assets/icons/fb.svg'
import InstagramDark from '../../assets/icons/instagram-dark.svg'
import Instagram from '../../assets/icons/instagram.svg'
import LinkedinDark from '../../assets/icons/linkedin-dark.svg'
import Linkedin from '../../assets/icons/linkedin.svg'
import Logo from '../../assets/icons/logo'
import { routeElements } from '../../config/routeElements'
import Layout from '../Layout'


const query = graphql`
{
    allWpCategory(filter: {slug: {nin: ["news", "uncategorized", "mssp-services"]}}) {
        edges {
            node {
                slug
                name
            }
        }
    }
    wpPage {
        footer {
        address
        email
        facebook
        instagram
        linkedin
        telephone
        }
    }
}`

export const Footer = ({ theme } :{theme?: string}) => {
    const data = useStaticQuery(query)
    return (
        <footer className={`${theme === 'light' ? styles.light : ''}`}>
            <Layout>
                <nav>
                    <div>
                        <Link className={styles.logo} to={'/'}>{theme === 'dark' ? <StaticImage src="../../assets/icons/logo_black.svg" alt="logo"/> : <StaticImage src="../../assets/icons/logo.svg" alt="logo"/>}</Link>
                        <div className={styles.socmedia}>
                            <a href={data.wpPage.footer.facebook}>{theme === 'light' ? <img src={FbIconDark}/> : <img src={FbIcon}/>}</a>
                            <a href={data.wpPage.footer.instagram}>{theme === 'light' ? <img src={InstagramDark}/> : <img src={Instagram}/>}</a>
                            <a href={data.wpPage.footer.linkedin}>{theme === 'light' ? <img src={LinkedinDark}/> : <img src={Linkedin}/>}</a>
                        </div>
                    </div>
                    <div>
                        <div className={styles.contacts}>
                            <div className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{data.wpPage.footer.address}</div>
                            <div className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{data.wpPage.footer.telephone}</div>
                        </div>
                        <div className={`${styles.email} ${theme === 'light' && styles.light}`}>{data.wpPage.footer.email}</div>
                    </div>
                    <div className={styles.routes}>
                        {routeElements.map(route => (
                            <Link key={route.url} to={route.url} className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{route.text[0].toUpperCase()}{route.text.slice(1)}</Link>
                        ))}
                        <div className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>Вакансии</div>
                        <div className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>Наши реквизиты</div>
                    </div>
                    <div className={styles.routes}>
                    {data.allWpCategory.edges.map((el: any) => (
                        <div key={el.node.name} className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{el.node.name}</div>
                    ))}
                    </div>
                </nav>
            </Layout>
        </footer>
    )
}