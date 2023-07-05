import React from "react"
import Layout from "../../../components/Layout"
import aboutImage from "../../../assets/images/about-main.jpg"
import styles from "./styles.module.scss"

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