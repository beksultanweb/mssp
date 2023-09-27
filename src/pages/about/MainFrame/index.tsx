import { StaticImage } from 'gatsby-plugin-image'

import styles from './styles.module.scss'

import Layout from '../../../components/Layout'


const MainFrame = () => {
  return (
    <div className={styles.about_main}>
        <Layout>
            <div className={styles.about__content}>
                <h1 className={styles.title}>Компания<br/>по обеспечению информационной безопасности</h1>
                <StaticImage width={853} src='../../../assets/images/teammate6.jpg' className={styles.about_image} alt="" />
            </div>
        </Layout>
    </div>
  )
}

export default MainFrame