import { StaticImage } from 'gatsby-plugin-image'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import React, { useEffect } from 'react'

import styles from './styles.module.scss'

import Layout from '../../../components/Layout'


const TeamFrame = () => {
  const bubblesRef = React.useRef<any>([])

  gsap.registerPlugin(MotionPathPlugin)
  useEffect(() => {
    if(typeof window !== 'undefined') {
      if(window.innerWidth > 600) {
        bubblesRef.current.map((el: any, ind: number) => {
          if(ind % 2) {
            gsap.to(el, {
              repeat: -1,
              ease: 'none',
              duration: 20,
              motionPath: 'm 1.000003,76.015001 a 75.000001,75.000001 0 1 1 149.999997,0 75.000001,75.000001 0 1 1 -149.999997,0 m 74.999999,0'
            })
          }
          else gsap.to(el, {
            repeat: -1,
            ease: 'none',
            duration: 15,
            motionPath: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          })
        })
      }
      else {
        bubblesRef.current.map((el: any, ind: number) => {
          if(ind % 3) {
            gsap.to(el, {
              repeat: -1,
              ease: 'none',
              duration: 20,
              motionPath: 'm 0.5 38.0075 a 37.5 37.5 90 1 1 75 0 a 37.5 37.5 90 1 1 -75 0 m 37.5 0'
            })
          }
          else gsap.to(el, {
            repeat: -1,
            ease: 'none',
            duration: 15,
            motionPath: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
          })
        })
      }
    }
  }, [])


  return (
    <div className={styles.container}>
      <Layout>
        <h2 className={styles.white_text}>Наша команда</h2>
        <div className={styles.flex}>
          <span className={styles.white_text}>/002</span><p className={styles.white_text}>Надёжная защита ваших данных и бизнеса — наша главная задача!</p>
        </div>
      </Layout>
      <div className={styles.gallery}>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={261} height={321} className={styles.img} src='../../../assets/images/team/teammate1.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={258} height={303} className={styles.img} src='../../../assets/images/team/teammate2.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={261} height={321} className={styles.img} src='../../../assets/images/team/teammate3.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={261} height={341} className={styles.img} src='../../../assets/images/team/teammate4.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={482} height={350} className={styles.img} src='../../../assets/images/team/teammate5.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={404} height={240} className={styles.img} src='../../../assets/images/team/teammate6.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={453} height={301} className={styles.img} src='../../../assets/images/team/teammate7.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={302} height={300} className={styles.img} src='../../../assets/images/team/teammate8.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={503} height={314} className={styles.img} src='../../../assets/images/team/teammate9.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={297} height={350} className={styles.img} src='../../../assets/images/team/teammate10.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={349} height={250} className={styles.img} src='../../../assets/images/team/teammate11.jpg' alt="" /></div>
          <div ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)}><StaticImage width={261} height={321} className={styles.img} src='../../../assets/images/team/teammate12.jpg' alt="" /></div>
        </div>
    </div>
  )
}

export default TeamFrame