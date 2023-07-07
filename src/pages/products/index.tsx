import React, {useState} from "react"
import type { HeadFC, PageProps } from "gatsby"
import Header from "../../components/Header"
import Layout from "../../components/Layout"
import styles from "./styles.module.scss"
import { useStaticQuery, graphql, Link } from "gatsby"
import Arrow from "../../assets/icons/arrow"
import { Footer } from "../../components/Footer"
import transliterate from "@sindresorhus/transliterate"
import { StaticImage } from "gatsby-plugin-image"
import slugify from "slugify"

const fetchData = graphql`
query($selectedCategory: String) {
    wpPage {
        ourServicesBlock {
          description
          title
          button
        }
    }
    allWpCategory(filter: {slug: {nin: ["news", "uncategorized", "mssp-services"]}}) {
        edges {
            node {
                slug
                name
            }
        }
    }
    allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: $selectedCategory}}}}}) {
        nodes {
          ServiceInformation {
            description
            icon {
              sourceUrl
            }
          }
          title
          slug
          categories {
            nodes {
              slug
            }
          }
        }
      }
}`

const ProductsPage: React.FC<PageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState('blue-team')
  const data = useStaticQuery(fetchData)
  const categoryData = data.allWpPost.nodes.filter((node: any) => node.categories.nodes.some((category: any) => category.slug === selectedCategory))
  return (
    <>
      <Header theme="dark"/>
      <Layout>
        <div>
          <h2>Услуги</h2>
          <div className={styles.flex}>
            <span>/002</span>
            <p className={styles.paragraph}>Обеспечиваем вашей компании доступ к экспертам по кибербезопасности и информационной безопасности высочайшего уровня, не зависимо от её масштабов и местоположения. Надёжная защита ваших данных и бизнеса — наша главная задача!</p>
          </div>
          <div className={styles.services}>
            <div className={styles.tabs}>
              {data.allWpCategory.edges.map((el: any) => (
                  <>{el.node.slug === selectedCategory ?
                      <button className={styles.tabs__btn_active}>{el.node.name}<Arrow rotate={45} theme="light"/></button>
                      : <button className={styles.tabs__btn} onClick={() => setSelectedCategory(el.node.slug)}>{el.node.name}<Arrow theme="dark"/></button>
                  }</>
              ))}
            </div>
            <div className={styles.tabs__content}>
                {categoryData.map((post: any) =>
                    <Link to={`/products/${post.slug}`} className={styles.tabs__box}>
                        <img src={post.ServiceInformation.icon.sourceUrl} alt="" />
                        <div className={styles.tabs__title}>{post.title}</div>
                        <div className={styles.tabs__descr}>{post.ServiceInformation.description}</div>
                    </Link>
                )}
            </div>
          </div>
          <div className={styles.cta}>
            <h2 className={styles.cta__title}>Записаться на консультацию</h2>
            <div className={styles.cta__subtitle}>Гарантируем доступ к экспертам по кибербезопасности высочайшего уровня для вашей компании, где бы она ни находилась и какого бы масштаба не была!</div>
            <button className={styles.cta__btn}>Связаться с вами<Arrow theme="light"/></button>
          </div>
        </div>
      </Layout>
      <Footer/>
    </>
  )
}

export default ProductsPage