import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import React, { useEffect, useRef, useState } from 'react'

import Slider from 'react-slick'

import styles from './styles.module.scss'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

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
                gatsbyImage(width: 72, formats: WEBP, quality: 100)
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

const NextArrow = (props) => {
    return (
        <img onClick={props.onClick} className={styles.tabs__next} src={arrow} alt="" />
    );
}

const PrevArrow = (props) => {
    return (
        <img onClick={props.onClick} className={styles.tabs__prev} style={{ transform: 'rotate(180deg)' }} src={arrow} alt="" />
    );
}

const ProductsFrame = () => {
    const [selectedCategory, setSelectedCategory] = useState('blue-team')
    const data = useStaticQuery(fetchData)
    const categoryData = data.allWpPost.nodes.filter((node: any) => node.categories.nodes.some((category: any) => category.slug === selectedCategory))

    const settings = {
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow/>,
        prevArrow: <PrevArrow/>,
        infinite: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false
              }
            }
          ]
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
    const sliderRef = React.useRef(null)
    const handleChangeCategory = (slug: string) => {
        setSelectedCategory(slug)
        sliderRef.current?.slickGoTo(0)
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
                        <button key={el.node.name} className={styles.tabs__btn} onClick={() => handleChangeCategory(el.node.slug)}>{el.node.name}<Arrow theme="light"/></button>
                    )
                }
            })}
            </div>
            <div className={styles.tabs__parent}>
                <Slider ref={sliderRef} className={styles.tabs__content} {...settings}>
                    {categoryData.map((post: any) =>
                        <Link key={post.slug} to={`/products/${post.slug}`} className={styles.tabs__box}>
                            <GatsbyImage image={getImage(post.ServiceInformation.icon)} alt="" />
                            <div className={styles.tabs__title}>{post.title}</div>
                            <div className={styles.tabs__descr}>{post.ServiceInformation.description}</div>
                        </Link>
                    )}
                </Slider>
            </div>
        </Layout>
        </section>
    )
}

export default ProductsFrame