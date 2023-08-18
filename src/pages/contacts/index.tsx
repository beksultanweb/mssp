import { useStaticQuery, PageProps, graphql } from 'gatsby'

import styles from './styles.module.scss'

import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'



const query = graphql`
{
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


const AboutPage: React.FC<PageProps> = () => {
    const data = useStaticQuery(query)

  return (
    <section className={styles.contacts}>
      <Header theme="light"/>
      <Layout>
      <div className={styles.contacts__content}>
        <div>
            <h2 className={styles.title}>Свяжитесь с нами!</h2>
            <a href={`mailto:${data.wpPage.footer.email}`} className={styles.contacts__text}>{data.wpPage.footer.email}</a>
            <a href={`tel:${data.wpPage.footer.telephone}`} className={`${styles.contacts__text} ${styles.contacts__phone}`}>{data.wpPage.footer.telephone}</a>
            <a href={`tel:${data.wpPage.footer.telephone2}`} className={`${styles.contacts__text} ${styles.contacts__phone}`}>{data.wpPage.footer.telephone2}</a>
            <div className={styles.contacts__text}>{data.wpPage.footer.address}</div>
        </div>
        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A35c4044fb6a74e1509e60945e8764fba9b2364f09d1a6a9fa5ebc4971b1ac3f9&amp;source=constructor" width="100%" height="460"></iframe>
      </div>
      </Layout>
      <Footer theme='light'/>
    </section>
  )
}

export default AboutPage