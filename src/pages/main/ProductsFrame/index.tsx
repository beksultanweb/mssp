import { useStaticQuery, graphql, Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'

import Arrow from '../../../assets/icons/arrow'
import arrow from '../../../assets/icons/Arrow.svg'
import Layout from '../../../components/Layout'

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

const SLIDER_WIDTH = 388

const ProductsFrame = () => {
    const [selectedCategory, setSelectedCategory] = useState('blue-team')
    const data = useStaticQuery(fetchData)
    const categoryData = data.allWpPost.nodes.filter((node: any) => node.categories.nodes.some((category: any) => category.slug === selectedCategory))

    const [offset, setOffset] = useState(0)
    const [ellipseLeft, setEllipseLeft] = useState(193)

    const handleLeftSlider = () => {
        setOffset((currentOffset) => {
            const newOffset = currentOffset + SLIDER_WIDTH
            return Math.min(newOffset, 0)
        })
        if(offset > -1 * SLIDER_WIDTH) {
            setEllipseLeft(193)
        }
        else setEllipseLeft((left) => {
            return left
        })
    }
    const handleRightSlider = () => {
        const maxOffset = -(SLIDER_WIDTH / 2 * categoryData.length)
        setOffset((currentOffset) => {
            const newOffset = currentOffset - SLIDER_WIDTH
            return Math.max(newOffset, maxOffset)
        })
        if(offset <= -(SLIDER_WIDTH / 2 * 3)) {
            setEllipseLeft(left => {
                const newLeft = left * 2 + 15
                if(newLeft <= maxOffset * -1) {
                    return newLeft
                }
                else return left
            })
        }
    }

    const ref = React.useRef(null)

    if(typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
        React.useEffect(() => {
            const element = ref.current
            gsap.fromTo(element,
                { y: 0 }, { y: -600, scrollTrigger: {
                    trigger: element,
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true
                } })
        }, [])
    }

    return (
        <section className={styles.products} ref={ref}>
        <Layout>
            <div className={styles.products__head}>
                <h2 className={styles.white_text}>{data.wpPage.ourServicesBlock.title}</h2>
                <button className={styles.products__btn}>{data.wpPage.ourServicesBlock.button}<Arrow theme="dark"/></button>
            </div>
            <span className={styles.white_text}>/002</span><p className={`${styles.white_text} ${styles.change_width}`}>{data.wpPage.ourServicesBlock.description}</p>
            <div className={styles.tabs}>
            {data.allWpCategory.edges.map((el: any) => {
                if(el.node.slug === selectedCategory) {
                    return (
                        <button key={el.node.name} className={styles.tabs__btn_active}>{el.node.name}<Arrow theme="dark" rotate={180}/></button>
                    )
                }
                else {
                    return (
                        <button key={el.node.name} className={styles.tabs__btn} onClick={() => setSelectedCategory(el.node.slug)}>{el.node.name}<Arrow theme="light"/></button>
                    )
                }
            })}
            </div>
            <div className={styles.tabs__parent}>
                <StaticImage style={{ left: `${ellipseLeft}px` }} className={styles.tabs__ellipse} src="../../../assets/icons/Ellipse.svg" alt="" />
                <div className={styles.tabs__content} style={{ transform: `translateX(${offset}px)` }}>
                    {categoryData.map((post: any) =>
                        <Link key={post.slug} to={`/products/${post.slug}`} className={styles.tabs__box}>
                            <img src={post.ServiceInformation.icon.sourceUrl} alt="" />
                            <div className={styles.tabs__title}>{post.title}</div>
                            <div className={styles.tabs__descr}>{post.ServiceInformation.description}</div>
                        </Link>
                    )}
                </div>
            </div>
            <div className={styles.tabs__navigation}>
                <img style={{ transform: 'rotate(180deg)' }} src={arrow} onClick={handleLeftSlider} alt="" />
                <img src={arrow} onClick={handleRightSlider} alt="" />
            </div>
        </Layout>
        </section>
    )
}

export default ProductsFrame