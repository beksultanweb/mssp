import { Link } from 'gatsby'
import { graphql, useStaticQuery } from 'gatsby'

import styles from './styles.module.scss'

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
        instagram
        linkedin
        telephone
        telephone2
        }
        Awards {
            requisites {
              mediaItemUrl
            }
          }
    }
}`

export const Footer = ({ theme } :{theme?: string}) => {
    const data = useStaticQuery(query)

    return (
        <footer className={`${theme === 'light' ? styles.light : ''}`} id="footer">
            <Layout>
                <nav>
                    <div>
                        <Link className={styles.logo} to={'/'}><Logo theme={theme === 'light' ? 'dark' : 'light'}/></Link>
                        <div className={styles.socmedia}>
                            <a href={data.wpPage.footer.instagram} target='_blank' rel='noreferrer'>{theme === 'light' ? <img src={InstagramDark}/> : <img src={Instagram}/>}</a>
                            <a href={data.wpPage.footer.linkedin} target='_blank' rel='noreferrer'>{theme === 'light' ? <img src={LinkedinDark}/> : <img src={Linkedin}/>}</a>
                        </div>
                    </div>
                    <div>
                        <div className={styles.contacts}>
                            <div className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{data.wpPage.footer.address}</div>
                            <div>
                                <a href={`tel:${data.wpPage.footer.telephone}`} className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{data.wpPage.footer.telephone}</a>
                                <a href={`tel:${data.wpPage.footer.telephone2}`} className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{data.wpPage.footer.telephone2}</a>
                            </div>
                        </div>
                        <a href={`mailto:${data.wpPage.footer.email}`} className={`${styles.email} ${theme === 'light' && styles.light}`}>{data.wpPage.footer.email}</a>
                    </div>
                    <div className={styles.routes}>
                        {routeElements.map(route => (
                            <Link key={route.url} to={route.url} className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{route.text[0].toUpperCase()}{route.text.slice(1)}</Link>
                        ))}
                        <a href='https://astana.hh.kz/employer/5560612' target='_blank' rel='noreferrer' className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>Вакансии</a>
                        <a href={data.wpPage.Awards.requisites.mediaItemUrl} download className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>Наши реквизиты</a>
                    </div>
                    <div className={styles.routes}>
                    {data.allWpCategory.edges.map((el: any) => (
                        <Link key={el.node.name} to={'/products'} state={{ product: el.node.slug }} className={`${styles.footer__item} ${theme === 'light' && styles.light}`}>{el.node.name}</Link>
                    ))}
                    </div>
                </nav>
            </Layout>
        </footer>
    )
}