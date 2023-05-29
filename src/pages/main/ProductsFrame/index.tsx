import React from "react"
import Layout from "../../../components/Layout"
import Arrow from "../../../assets/icons/arrow"
import arrow from "../../../assets/icons/Arrow.svg"
import ocib from "../../../assets/icons/ocib.svg"
import ellipse from "../../../assets/icons/Ellipse.svg"
// import "./styles.module.scss"
import styles from "./styles.module.scss"

const ProductsFrame = () => {
    return (
        <section className={styles.products}>
        <Layout>
            <div className={styles.products__head}>
                <h2 className={styles.white_text}>Услуги</h2>
                <button className={styles.products__btn}>Подробнее<Arrow/></button>
            </div>
            <span className={styles.white_text}>/002</span><p className={`${styles.white_text} ${styles.change_width}`}>Обеспечиваем вашей компании доступ к экспертам по кибербезопасности и информационной безопасности высочайшего уровня, не зависимо от её масштабов и местоположения. Надёжная защита ваших данных и бизнеса — наша главная задача!</p>
            <div className={styles.tabs}>
                <button className={styles.tabs__btn_active}>Blue team<Arrow rotate={180}/></button>
                <button className={styles.tabs__btn}>Read team<Arrow theme="dark"/></button>
                <button className={styles.tabs__btn}>Consulting<Arrow theme="dark"/></button>
                <button className={styles.tabs__btn}>Подбор и внедрение СЗИ<Arrow theme="dark"/></button>
                <button className={styles.tabs__btn}>Research Laboratory<Arrow theme="dark"/></button>
                <button className={styles.tabs__btn}>Наши решения<Arrow theme="dark"/></button>
            </div>
            <div className={styles.tabs__content}>
                <img className={styles.tabs__ellipse} src={ellipse} alt="" />
                <div className={styles.tabs__box}>
                    <img src={ocib} alt="" />
                    <div className={styles.tabs__title}>ОЦИБ (SOC)</div>
                    <div className={styles.tabs__descr}>Мы предоставляем полный спектр услуг по мониторингу, реагированию и анализу событий информационной безопасности.</div>
                </div>
                <div className={styles.tabs__box}>
                <img src={ocib} alt="" />
                    <div className={styles.tabs__title}>ОЦИБ (SOC)</div>
                    <div className={styles.tabs__descr}>Мы предоставляем полный спектр услуг по мониторингу, реагированию и анализу событий информационной безопасности.</div>
                </div>
                <div className={styles.tabs__box}>
                    <img src={ocib} alt="" />
                    <div className={styles.tabs__title}>ОЦИБ (SOC)</div>
                    <div className={styles.tabs__descr}>Мы предоставляем полный спектр услуг по мониторингу, реагированию и анализу событий информационной безопасности.</div>
                </div>
                <div className={styles.tabs__box}>
                    <img src={ocib} alt="" />
                    <div className={styles.tabs__title}>ОЦИБ (SOC)</div>
                    <div className={styles.tabs__descr}>Мы предоставляем полный спектр услуг по мониторингу, реагированию и анализу событий информационной безопасности.</div>
                </div>
                <div className={styles.tabs__box}>
                    <img src={ocib} alt="" />
                    <div className={styles.tabs__title}>ОЦИБ (SOC)</div>
                    <div className={styles.tabs__descr}>Мы предоставляем полный спектр услуг по мониторингу, реагированию и анализу событий информационной безопасности.</div>
                </div>
                <div className={styles.tabs__box}>
                    <img src={ocib} alt="" />
                    <div className={styles.tabs__title}>ОЦИБ (SOC)</div>
                    <div className={styles.tabs__descr}>Мы предоставляем полный спектр услуг по мониторингу, реагированию и анализу событий информационной безопасности.</div>
                </div>
                <div className={styles.tabs__box}>
                    <img src={ocib} alt="" />
                    <div className={styles.tabs__title}>ОЦИБ (SOC)</div>
                    <div className={styles.tabs__descr}>Мы предоставляем полный спектр услуг по мониторингу, реагированию и анализу событий информационной безопасности.</div>
                </div>
                <div className={styles.tabs__box}>
                    <img src={ocib} alt="" />
                    <div className={styles.tabs__title}>ОЦИБ (SOC)</div>
                    <div className={styles.tabs__descr}>Мы предоставляем полный спектр услуг по мониторингу, реагированию и анализу событий информационной безопасности.</div>
                </div>
            </div>
            <div className={styles.tabs__navigation}>
                <img style={{transform: 'rotate(180deg)'}} src={arrow} alt="" />
                <img src={arrow} alt="" />
            </div>
        </Layout>
        </section>
    )
}

export default ProductsFrame