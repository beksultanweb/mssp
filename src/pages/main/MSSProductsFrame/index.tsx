import React, { createRef, useEffect } from "react"
import Layout from "../../../components/Layout"
import Arrow from "../../../assets/icons/arrow"
import styles from "./styles.module.scss"
import productsStyles from "../ProductsFrame/styles.module.scss"
import { graphql, useStaticQuery } from "gatsby"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const query = graphql`
{
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

    const bubblesRef = React.useRef<any>([])
    gsap.registerPlugin(ScrollTrigger)
    useEffect(() => {
        if(window.innerWidth >= 600) {
            gsap.fromTo(bubblesRef.current[0], {x: 0, y: 100}, {x: "+80px", duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[1], {x: 80, y: 250}, {y: 200, duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[2], {x: -20, y: 0}, {x: "+80px", y: "80px", duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[3], {x: 0, y: 150}, {x: "+100px", y: 240, duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[4], {x: 0, y: 80}, {x: "+100px", y: 40, duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[5], {x: -40, y: 200}, {x: "+50px", duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[6], {x: 100, y: 40}, {x: 150, y: 20, duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[7], {x: 0, y: -150}, {x: "+100px", y: -220, duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[8], {x: 80, y: 0}, {x: "+100px", y: "+20px", duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[9], {x: 60, y: -280}, {x: "+100px", y: -200, duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[10], {x: 0, y: 0}, {x: "+100px", duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
            gsap.fromTo(bubblesRef.current[11], {x: 100, y: -240}, {x: 150, y: -200, duration: 3, scrollTrigger: {
                trigger: bubblesRef.current,
                toggleActions: "play pause reverse reset"
            }})
        }
        else {
            gsap.set(bubblesRef.current[0], {x: 70, y: 0})
            gsap.set(bubblesRef.current[1], {x: 0, y: 120})
            gsap.set(bubblesRef.current[2], {x: 30, y: 30})
            gsap.set(bubblesRef.current[3], {x: 0, y: 200})
            gsap.set(bubblesRef.current[4], {x: 140, y: 200})
            gsap.set(bubblesRef.current[5], {x: -40, y: 90})
            gsap.set(bubblesRef.current[6], {x: 0, y: -180})
            gsap.set(bubblesRef.current[7], {x: -120, y: -70})
            gsap.set(bubblesRef.current[8], {x: -150, y: -10})
            gsap.set(bubblesRef.current[9], {x: 150, y: -40})
            gsap.set(bubblesRef.current[10], {x: 130, y: -240})
            gsap.set(bubblesRef.current[11], {x: 70, y: -150})
        }
    }, [])

    return (
        <section className={styles.products}>
        <Layout>
            <div className={productsStyles.products__head}>
                <h2 className={productsStyles.white_text}>MSS-услуги</h2>
                <button className={productsStyles.products__btn}>Подробнее<Arrow theme="dark"/></button>
            </div>
            <div className={styles.flex}>
                <span className={productsStyles.white_text}>/003</span>
                <p className={styles.paragraph}>Приобретайте средства защиты информации по подписке и платите так, как вам удобно</p>
            </div>
            <div className={styles.bubbles}>
            {sortedNodes.slice(0, 6).map((node: any) => (
                <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={`${styles.big_circle} ${styles[node.slug]}`}>
                    <div className="product_name">{node.title}</div>
                </div>
            ))}
            {sortedNodes.slice(6).map((node: any) => (
                <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={`${styles.small_circle} ${styles[node.slug]}`}>
                    <div className="product_name">{node.title}</div>
                </div>
            ))}
            </div>
        </Layout>
        </section>
    )
}

export default MSSProductsFrame