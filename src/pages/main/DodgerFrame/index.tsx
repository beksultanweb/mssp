import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'

import styles from './styles.module.scss'

import Button from '../../../components/Button'
import Layout from '../../../components/Layout'


const query = graphql`
{
    wpPage {
      dodger {
        dodgerDescr
      }
    }
  }`

const DodgerFrame = () => {
    const data = useStaticQuery(query)
    return (
        <section className={styles.dodger}>
            <StaticImage className={styles.dodger__img} width={551} height={500} imgStyle={{ borderRadius: '0 24px 24px 0' }} src="../../../assets/images/dodger.jpg" alt="dodger_img"/>
            <div className={styles.darknet}>Darknet</div>
            <div className={styles.security}>Security</div>
            <Layout>
                <h2>Dodger</h2>
                <div className={styles.flex}>
                    <span>/005</span>
                    <p className={styles.paragraph}>{data.wpPage.dodger.dodgerDescr}</p>
                </div>
                <Button txt='Подробнее' theme='dark'/>
            </Layout>
        </section>
    )
}

export default DodgerFrame