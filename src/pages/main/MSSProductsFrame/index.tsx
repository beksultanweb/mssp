import React from "react"
import Layout from "../../../components/Layout"
import Arrow from "../../../assets/icons/arrow"
import styles from "./styles.module.scss"
import productsStyles from "../ProductsFrame/styles.module.scss"

export const MSSProductsFrame = () => {
    return (
        <section className={productsStyles.products}>
        <Layout>
            <div className={productsStyles.products__head}>
                <h2 className={productsStyles.white_text}>MSS-услуги</h2>
                <button className={productsStyles.products__btn}>Подробнее<Arrow/></button>
            </div>
            <span className={productsStyles.white_text}>/003</span><p className={productsStyles.white_text}>Приобретайте средства защиты информации по подписке и платите так, как вам удобно</p>
            <div className={styles.bubbles}>
                <div className={styles.big_circle}>
                    <div className="product_name">DLP Киберстраж</div>
                </div>
                <div className={styles.big_circle}>
                    <div className="product_name">Mail gateway</div>
                </div>
                <div className={styles.big_circle}>
                    <div className="product_name">DLP Киберстраж</div>
                </div>
                <div className={styles.big_circle}>
                    <div className="product_name">Сканер уязвимости</div>
                </div>
                <div className={styles.big_circle}>
                    <div className="product_name">Антивирус</div>
                </div>
                <div className={styles.big_circle}>
                    <div className="product_name">SIEM</div>
                </div>
                <div className={styles.small_circle}>
                    <div className="product_name">PAM</div>
                </div>
                <div className={styles.small_circle}>
                    <div className="product_name">WAF</div>
                </div>
                <div className={styles.small_circle}>
                    <div className="product_name">NGFW</div>
                </div>
                <div className={styles.small_circle}>
                    <div className="product_name">SD-WAN</div>
                </div>
                <div className={styles.small_circle}>
                    <div className="product_name">EDR</div>
                </div>
                <div className={styles.small_circle}>
                    <div className="product_name">IRP</div>
                </div>
            </div>
        </Layout>
        </section>
    )
}