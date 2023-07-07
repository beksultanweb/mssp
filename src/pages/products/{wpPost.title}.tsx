import React, { useState } from "react"
import Layout from "../../components/Layout"
import Header from "../../components/Header"
import { Footer } from "../../components/Footer"
import styles from "./styles.module.scss"
import BreadCrumb from "../../components/BreadCrumb"
import { graphql, Link } from "gatsby"
import slugify from "slugify"
import { PageProps } from "gatsby"
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image"
import saveIcon from "../../assets/icons/download-light.svg"
import Arrow from "../../assets/icons/arrow"
import { SimilarHead } from "../../components/AdditionalTitle"

export const query = graphql`
query MyQuery($title: String, $parent: String) {
    allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: $parent}}}}}) {
      nodes {
        ServiceInformation {
          description
          icon {
            sourceUrl
          }
        }
        title
        categories {
          nodes {
            name
          }
        }
      }
    }
    wpPost(title: {eq: $title}) {
      title
      ServiceInformation {
        yearOfProduction
        iconAdvantage1 {
          sourceUrl
        }
        iconAdvantage2 {
          sourceUrl
        }
        iconAdvantage3 {
          sourceUrl
        }
        advantage1
        advantage2
        advantage3
        presentation {
          mediaItemUrl
        }
        deadlines
      }
      categories {
        nodes {
          name
        }
      }
      content
    }
  }
`

interface ProductPageProps {
    data: {
      allWpPost: {
        nodes: {
          ServiceInformation: {
            description: string
            icon: {
              sourceUrl: string
            }
          }
          title: string
          categories: {
            nodes: {
              name: string
            }[]
          }
        }[]
      }
        wpPost: {
            ServiceInformation: {
                yearOfProduction: string
                iconAdvantage1: {
                  sourceUrl: string
                }
                iconAdvantage2: {
                  sourceUrl: string
                }
                iconAdvantage3: {
                  sourceUrl: string
                }
                advantage1: string
                advantage2: string
                advantage3: string
                presentation: {
                  mediaItemUrl: string
                }
                deadlines: string
            }
            title: string
            slug: string
            categories: {
                nodes: {
                  name: string
                }[]
              }
            content: string
        }
    }
}

const Product = ({data}: ProductPageProps) => {
    const { title, content } = data.wpPost
    const parent = data.wpPost.categories.nodes[0].name
    const {yearOfProduction, deadlines, presentation, advantage1, advantage2, advantage3, iconAdvantage1, iconAdvantage2, iconAdvantage3} = data.wpPost.ServiceInformation
    const separatedContent = content.split('<!--nextpage-->')
    const categoryData = data.allWpPost.nodes.filter((node: any) => node.categories.nodes.some((category: any) => category.name === parent))

    return(
        <>
        <section className={styles.top}>
            <Header theme="light"/>
            <Layout>
                <BreadCrumb className={styles.breadcrumb} parent={parent} current={title} />
                <div className={styles.top__content}>
                  <div>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.top__addinfo}>
                      <div>
                        <div className={styles.top__title}>Год выпуска</div>
                        <div className={styles.top__subtitle}>{yearOfProduction}</div>
                      </div>
                      <div>
                        <div className={styles.top__title}>Срок исполнения</div>
                        <div className={styles.top__subtitle}>{deadlines}</div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.top__btns}>
                    <a href={presentation.mediaItemUrl} className={styles.a_download} download><button className={styles.btn}>Скачать презентацию <img src={saveIcon} alt="save" /></button></a>
                    <button className={styles.btn}>Консультация</button>
                  </div>
                </div>
            </Layout>
        </section>
        <section>
          <Layout>
            <div className={styles.about_service}>
              <div className={styles.flex}>
                <span>/001</span>
                <h2 className={styles.about_service__title}>О услуге</h2>
              </div>
              <div className={styles.about_service__content} dangerouslySetInnerHTML={{__html: separatedContent[0]}}></div>
            </div>
            <div className={styles.about_service__advantages}>
              <div className={styles.about_service__advantage}><img src={iconAdvantage1.sourceUrl} alt="advantage" />{advantage1}</div>
              <div className={styles.about_service__advantage}><img src={iconAdvantage2.sourceUrl} alt="advantage" />{advantage2}</div>
              <div className={styles.about_service__advantage}><img src={iconAdvantage3.sourceUrl} alt="advantage" />{advantage3}</div>
            </div>
            <div className={styles.about_service__content2} dangerouslySetInnerHTML={{__html: separatedContent[1]}}></div>
          </Layout>
        </section>
        <section>
          <Layout>
            <SimilarHead title="Похожие услуги" order="/002" buttonTxt="Все услуги"/>
            <div className={styles.tabs__like}>
            {categoryData.filter((post: any) => post.title !== title).map(post =>
              <Link to={`/products/${slugify(post.title, { lower: true })}`} className={styles.tabs__box}>
                  <img src={post.ServiceInformation.icon.sourceUrl} alt="" />
                  <div className={styles.tabs__title}>{post.title}</div>
                  <div className={styles.tabs__descr}>{post.ServiceInformation.description}</div>
              </Link>
            )}
            </div>
            <button className={styles.btn_services}>Все услуги<Arrow theme="dark"/></button>
          </Layout>
        </section>
        <Footer/>
        </>
    )
}

export default Product