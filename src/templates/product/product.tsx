import { graphql, Link, useStaticQuery } from 'gatsby'
import { PageProps } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import slugify from 'slugify'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import saveIcon from '../../assets/icons/download-light.svg'
import { SimilarHead } from '../../components/AdditionalTitle'
import BreadCrumb from '../../components/BreadCrumb'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Consultation from '../../components/Modal/Consultation'


const Product = ({ pageContext }: PageProps) => {
    const [consultationOpen, setConsultationOpen] = useState(false)
    const { product } = pageContext
    const { title, content } = product
    const { name, slug } = product.categories.nodes[0]
    const { deadlines, presentation, advantage1, advantage2, advantage3, iconAdvantage1, iconAdvantage2, iconAdvantage3 } = product.ServiceInformation
    const data = useStaticQuery(graphql`
    query MyQuery {
        allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "blue-team"}}}}}) {
          nodes {
            ServiceInformation {
              description
              icon {
                gatsbyImage(width: 72, formats: WEBP, quality: 100)
              }
            }
            title
            slug
            categories {
              nodes {
                name
                slug
              }
            }
          }
        }
      }
    `)
    const categoryData = data.allWpPost.nodes

    return(
        <>
        <section className={styles.top}>
            <Header theme="light"/>
            <Layout>
                <BreadCrumb className={styles.breadcrumb} parent='Продукты и услуги' parentLink='/products' category={name} categorySlug={slug} current={title} />
                <div className={styles.top__content}>
                  <div>
                    <h1 className={styles.title}>{title}</h1>
                    <div className={styles.top__addinfo}>
                      <div className={styles.top__title}>Срок исполнения</div>
                      <div className={styles.top__subtitle}>{deadlines}</div>
                    </div>
                  </div>
                  <div className={styles.top__btns}>
                    <a href={presentation?.mediaItemUrl} className={styles.a_download} download><button className={styles.btn}>Скачать презентацию <img src={saveIcon} alt="save" /></button></a>
                    <button onClick={() => setConsultationOpen(!consultationOpen)} className={styles.btn}>Консультация</button>
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
              <div className={styles.about_service__content} dangerouslySetInnerHTML={{ __html: content }}></div>
            </div>
            <div className={styles.about_service__advantages}>
              <div className={styles.about_service__advantage}><GatsbyImage image={getImage(iconAdvantage1)} alt="advantage" />{advantage1}</div>
              <div className={styles.about_service__advantage}><GatsbyImage image={getImage(iconAdvantage2)} alt="advantage" />{advantage2}</div>
              <div className={styles.about_service__advantage}><GatsbyImage image={getImage(iconAdvantage3)} alt="advantage" />{advantage3}</div>
            </div>
          </Layout>
        </section>
        <section>
          <Layout>
          <SimilarHead title="Похожие услуги" order="/002" buttonTxt="Все услуги"/>
            <div className={styles.tabs__like}>
            {categoryData.slice(0, 3).map(post =>
              <Link key={post.title} to={`/products/${post.slug}`} className={styles.tabs__box}>
                  <GatsbyImage image={getImage(post.ServiceInformation.icon)} alt="" />
                  <div className={styles.tabs__title}>{post.title}</div>
                  <div className={styles.tabs__descr}>{post.ServiceInformation.description}</div>
              </Link>
            )}
            </div>
            <button className={styles.btn_services}>Все услуги<Arrow theme="dark"/></button>
          </Layout>
        </section>
        <Footer/>
        {consultationOpen && <Consultation close={() => setConsultationOpen(false)}/>}
        </>
    )
}

export default Product