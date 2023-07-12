import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import React, { useEffect } from 'react'

import styles from './styles.module.scss'

import teammate1 from '../../../assets/images/team/teammate1.jpg'
import teammate10 from '../../../assets/images/team/teammate10.jpg'
import teammate11 from '../../../assets/images/team/teammate11.jpg'
import teammate12 from '../../../assets/images/team/teammate12.jpg'
import teammate2 from '../../../assets/images/team/teammate2.jpg'
import teammate3 from '../../../assets/images/team/teammate3.jpg'
import teammate4 from '../../../assets/images/team/teammate4.jpg'
import teammate5 from '../../../assets/images/team/teammate5.jpg'
import teammate6 from '../../../assets/images/team/teammate6.jpg'
import teammate7 from '../../../assets/images/team/teammate7.jpg'
import teammate8 from '../../../assets/images/team/teammate8.jpg'
import teammate9 from '../../../assets/images/team/teammate9.jpg'
import Layout from '../../../components/Layout'

const TeamFrame = () => {
  const bubblesRef = React.useRef<any>([])

  gsap.registerPlugin(MotionPathPlugin)
  useEffect(() => {
    if(window.innerWidth > 600) {
      bubblesRef.current.map((el: any, ind: number) => {
        if(ind % 2) {
          gsap.to(el, {
            repeat: -1,
            ease: 'none',
            duration: 10,
            motionPath: 'm 1.000003,76.015001 a 75.000001,75.000001 0 1 1 149.999997,0 75.000001,75.000001 0 1 1 -149.999997,0 m 74.999999,0'
          })
        }
        else gsap.to(el, {
          repeat: -1,
          ease: 'none',
          duration: 10,
          motionPath: 'M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
        })
      })
    }
    else {
      gsap.set(bubblesRef.current[0], { x: 0, y: 100 })
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
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate1} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate2} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate3} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate4} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate5} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate6} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate7} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate8} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate9} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate10} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate11} alt="" />
          <img ref={el => !bubblesRef.current.includes(el) && bubblesRef.current.push(el)} className={styles.img} src={teammate12} alt="" />
        </div>
    </div>
  )
}

export default TeamFrame