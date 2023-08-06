import { useStaticQuery, graphql } from 'gatsby'

import styles from './styles.module.scss'

import Layout from '../../../components/Layout'

const query = graphql`
query {
    wpPage {
      Company_numbers {
        aboutNumber1
        aboutNumber2
        aboutNumber3
        aboutNumber4
        aboutSubtitle
        aboutTitle
      }
    }
  }`

const ResultsFrame = () => {
    const data = useStaticQuery(query)
    const { aboutNumber1, aboutNumber2, aboutNumber3, aboutNumber4, aboutTitle, aboutSubtitle } = data.wpPage.Company_numbers
    const number1 = aboutNumber1.split(' ')[0]
    const number1others = aboutNumber1.slice(aboutNumber1.indexOf(' '), aboutNumber1.length)
    const number2 = aboutNumber2.split(' ')[0]
    const number2others = aboutNumber2.slice(aboutNumber2.indexOf(' '), aboutNumber2.length)
    const number3 = aboutNumber3.split(' ')[0]
    const number3others = aboutNumber3.slice(aboutNumber3.indexOf(' '), aboutNumber3.length)
    const number4 = aboutNumber4.split(' ')[0]
    const number4others = aboutNumber4.slice(aboutNumber4.indexOf(' '), aboutNumber4.length)
  return (
    <Layout>
        <div className={styles.about__content}>
            <h2 className={styles.title}>{aboutTitle}</h2>
            <p className={styles.subtitle}>{aboutSubtitle}</p>
            <div className={styles.results__content}>
                <div className={styles.results}>
                    <div className={styles.number}>{number1}</div>
                    <div className={styles.text}>{number1others}</div>
                </div>
                <div className={styles.results}>
                    <div className={styles.number}>{number2}</div>
                    <div className={styles.text}>{number2others}</div>
                </div>
                <div className={styles.results}>
                    <div className={styles.number}>{number3}</div>
                    <div className={styles.text}>{number3others}</div>
                </div>
                <div className={styles.results}>
                    <div className={styles.number}>{number4}</div>
                    <div className={styles.text}>{number4others}</div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default ResultsFrame