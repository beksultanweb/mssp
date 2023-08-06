import styles from './styles.module.scss'

import aboutImage from '../../../assets/images/about-main.jpg'
import Layout from '../../../components/Layout'

const MainFrame = () => {
  return (
    <div className={styles.about_main}>
        <Layout>
            <div className={styles.about__content}>
                <h1 className={styles.title}>Компания по обеспечению информационной безопасности</h1>
                <img src={aboutImage} className={styles.about_image} alt="" />
            </div>
        </Layout>
    </div>
  )
}

export default MainFrame