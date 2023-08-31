import { graphql, Link, useStaticQuery } from 'gatsby'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useLayoutEffect } from 'react'

import styles from './styles.module.scss'

import Button from '../../../components/Button'
import Layout from '../../../components/Layout'
import productsStyles from '../ProductsFrame/styles.module.scss'

const query = graphql`
{
    wpPage {
        mssservices {
            mssservicesDescr
        }
    }
    wpCategory(slug: {eq: "mssp-services"}) {
      slug
      posts {
        nodes {
            slug
            title
        }
      }
    }
  }`

const MSSProductsFrame = () => {
    const data = useStaticQuery(query)
    const sortedNodes = data.wpCategory.posts.nodes.sort((a: any, b: any) => {
        return b.title.length - a.title.length;
      });

    const bubblesRef = useRef<any>([])
    if(typeof window !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger)
        useLayoutEffect(() => {
            if(window.innerWidth >= 600) {
                gsap.fromTo(bubblesRef.current[0], { x: 0, y: 100 }, { x: '+80px', duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[1], { x: 80, y: 250 }, { y: 200, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[2], { x: -20, y: 0 }, { x: '+80px', y: '80px', duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[3], { x: 0, y: 150 }, { x: '+100px', y: 240, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[4], { x: 0, y: 80 }, { x: '+100px', y: 40, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[5], { x: -40, y: 200 }, { x: '+50px', duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[6], { x: 100, y: 40 }, { x: 150, y: 20, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[7], { x: 0, y: -150 }, { x: '+100px', y: -220, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[8], { x: 80, y: 0 }, { x: '+100px', y: '+20px', duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[9], { x: 60, y: -280 }, { x: '+100px', y: -200, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[10], { x: 0, y: 0 }, { x: '+100px', duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
            }
            else {
                gsap.fromTo(bubblesRef.current[0], { x: 70, y: 0 }, { x: 100, y: 20, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[1], { x: 0, y: 120 }, { x: 20, y: 150, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[2], { x: 0, y: 30 }, { y: 0, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[3], { x: 0, y: 200 }, { x: 30, y: 100, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[4], { x: 140, y: 200 }, { x: 100, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[5], { x: -40, y: 90 }, { x: 0, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[6], { x: 0, y: -180 }, { x: 20, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[7], { x: -120, y: -70 }, { y: -90, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[8], { x: -150, y: -10 }, { x: -100, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[9], { x: 150, y: -40 }, { x: '+80px', duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
                gsap.fromTo(bubblesRef.current[10], { x: 130, y: -240 }, { x: 120, y: -280, duration: 5, repeat: -1, yoyo: true, scrollTrigger: {
                    trigger: bubblesRef.current,
                    toggleActions: 'play pause resume pause'
                } })
            }
        }, [])
    }

    return (
        <section className={styles.products}>
        <Layout>
            <div className={productsStyles.products__head}>
                <h2 className={productsStyles.white_text}>MSS-услуги</h2>
                <Link to={'/products'} state={{ product: 'mssp-services' }}>
                    <Button className={productsStyles.products__btn} theme='dark' txt='Подробнее'/>
                </Link>
            </div>
            <div className={styles.flex}>
                <span className={productsStyles.white_text}>/003</span>
                <p className={styles.paragraph}>{data.wpPage.mssservices.mssservicesDescr}</p>
            </div>
            <div className={styles.bubbles}>
            {sortedNodes.slice(0, 6).map((node: any) => (
                <Link to={`/products/${node.slug}`} key={node.slug} ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={`${styles.big_circle} ${styles[node.slug]}`}>
                    <div className="product_name">{node.title}</div>
                </Link>
            ))}
            {sortedNodes.slice(6).map((node: any) => (
                <Link to={`/products/${node.slug}`} key={node.slug} ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={`${styles.small_circle} ${styles[node.slug]}`}>
                    <div className="product_name">{node.title}</div>
                </Link>
            ))}
            </div>
        </Layout>
        </section>
    )
}

export default MSSProductsFrame