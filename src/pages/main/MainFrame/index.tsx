import React from "react"
import Layout from "../../../components/Layout"
import Arrow from "../../../assets/icons/arrow"
import styles from "./styles.module.scss"
import mainPhoto from "../../../assets/images/main3.png"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const fetchMainBlockData = graphql`
{
    wpPage {
        homePage {
        fieldGroupName
        mainBtn
        mainSubtitle
        mainTitle
        }
    }
}`

const MainFrame = () => {
    const data = useStaticQuery(fetchMainBlockData)
    return (
        <div>
        <StaticImage
        src="../../../assets/images/main3.png"
        alt="bgphoto"
        className={styles.main3}
        />
        <StaticImage
        src="../../../assets/images/main1.png"
        alt="bgphoto"
        className={styles.main1}
        />
        <StaticImage
        src="../../../assets/images/main2.png"
        alt="bgphoto"
        className={styles.main2}
        />
        <Layout>
            <h1>{data.wpPage.homePage.mainTitle}</h1>
            <span>/001</span><p className={styles.paragraph}>{data.wpPage.homePage.mainSubtitle}</p>
            <button>{data.wpPage.homePage.mainBtn}<Arrow theme="dark"/></button>
        </Layout>
        </div>
    )
}

export default MainFrame