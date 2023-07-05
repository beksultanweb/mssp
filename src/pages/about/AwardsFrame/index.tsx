import React from "react"
import Layout from "../../../components/Layout"
import styles from "./styles.module.scss"
import download from "../../../assets/icons/download.svg"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const query = graphql`
query {
  wpPage {
    Awards {
      award1
      award2
      award3
      award4
      awardData1
      awardData2
      awardData3
      awardData4
      awardFile1 {
        gatsbyImage(width: 200)
      }
      awardFile2 {
        gatsbyImage(width: 200)
      }
      awardFile3 {
        gatsbyImage(width: 200)
      }
      awardFile4 {
        gatsbyImage(width: 200)
      }
      awardsSubtitle
      awardsTitle
      requisites {
        mediaItemUrl
      }
    }
  }
}`

const AwardsFrame = () => {
  const data = useStaticQuery(query)
  const {awardsTitle, awardsSubtitle, requisites, award1, award2, award3, award4, awardData1, awardData2, awardData3, awardData4, awardFile1, awardFile2, awardFile3, awardFile4} = data.wpPage.Awards
  const award_img1 = getImage(awardFile1)
  const award_img2 = getImage(awardFile2)
  const award_img3 = getImage(awardFile3)
  const award_img4 = getImage(awardFile4)

  const [active, setActive] = React.useState(0)
  const handleClickAward = (key: number) => {
    setActive(key)
  }

  const awardStyle = (key: number) => `${active === key ? styles.certificate__title_active : ''} ${styles.certificate__title}`
  const activeAward = (key: number) => `${active === key ? styles.certificate__img_active : styles.certificate__img}`

  return (
    <div className={styles.about_main}>
        <Layout>
          <div className={styles.about__content}>
            <div>
                <span>/006</span>
                <h2 className={styles.title}>Награды</h2>
            </div>
            <div>
                <div className={styles.about}>{awardsTitle}</div>
                <div className={styles.paragraph}>{awardsSubtitle}</div>
            </div>
          </div>
          <div>
            <div onMouseEnter={() => handleClickAward(0)} className={styles.certificate}>
              <div className={awardStyle(0)}>{award1}</div>
              <div>{awardData1}</div>
              {award_img1 && <GatsbyImage image={award_img1} className={activeAward(0)} alt="" />}
            </div>
            <div onMouseEnter={() => handleClickAward(1)} className={styles.certificate}>
              <div className={awardStyle(1)}>{award2}</div>
              <div>{awardData2}</div>
              {award_img2 && <GatsbyImage image={award_img2} className={activeAward(1)} alt="" />}
            </div>
            <div onMouseEnter={() => handleClickAward(2)} className={styles.certificate}>
              <div className={awardStyle(2)}>{award3}</div>
              <div>{awardData3}</div>
              {award_img3 && <GatsbyImage image={award_img3} className={activeAward(2)} alt="" />}
            </div>
            <div onMouseEnter={() => handleClickAward(3)} className={styles.certificate}>
              <div className={awardStyle(3)}>{award4}</div>
              <div>{awardData4}</div>
              {award_img4 && <GatsbyImage image={award_img4} className={activeAward(3)} alt="" />}
            </div>
          </div>
          <div className={styles.requisites}>
            <div>
              <h2 className={styles.requisites__title}>Наши реквизиты</h2>
              <p className={styles.requisites__text}>Вы можете скачать здесь информацию о реквизитах для получения подробной информации или для произведения оплаты.</p>
            </div>
            <a style={{textDecoration: 'none'}} href={requisites.mediaItemUrl} download><button className={styles.requisites__btn}>Скачать  реквизиты<img src={download} alt="" /></button></a>
          </div>
        </Layout>
    </div>
  )
}

export default AwardsFrame