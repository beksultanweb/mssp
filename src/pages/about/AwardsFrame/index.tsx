import { graphql, useStaticQuery } from 'gatsby'

import styles from './styles.module.scss'

import Layout from '../../../components/Layout'

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
      awardsSubtitle
      awardsTitle
      requisites {
        mediaItemUrl
      }
      brandbook {
        mediaItemUrl
      }
    }
  }
}`

const AwardsFrame = () => {
  const data = useStaticQuery(query)
  const { awardsTitle, awardsSubtitle, requisites, brandbook, award1, award2, award3, award4, awardData1, awardData2, awardData3, awardData4 } = data.wpPage.Awards

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
            <div className={styles.certificate}>
              <div className={styles.certificate__title}>{award1}</div>
              <div>{awardData1}</div>
            </div>
            <div className={styles.certificate}>
              <div className={styles.certificate__title}>{award2}</div>
              <div>{awardData2}</div>
            </div>
            <div className={styles.certificate}>
              <div className={styles.certificate__title}>{award3}</div>
              <div>{awardData3}</div>
            </div>
            <div className={styles.certificate}>
              <div className={styles.certificate__title}>{award4}</div>
              <div>{awardData4}</div>
            </div>
          </div>
          <div className={styles.requisites}>
            <div>
              <h2 className={styles.requisites__title}>Наши реквизиты</h2>
              <p className={styles.requisites__text}>Вы можете скачать здесь информацию о реквизитах для получения подробной информации или для произведения оплаты.</p>
            </div>
            <div className={styles.requisites__btns}>
              <a style={{ textDecoration: 'none' }} href={requisites.mediaItemUrl} download><button className={styles.requisites__btn}>Скачать  реквизиты</button></a>
              <a style={{ textDecoration: 'none' }} href={brandbook.mediaItemUrl} download><button className={styles.requisites__btn}>Скачать  брендбук</button></a>
            </div>
          </div>
        </Layout>
    </div>
  )
}

export default AwardsFrame