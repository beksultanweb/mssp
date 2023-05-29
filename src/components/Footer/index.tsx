import React from "react"
import { Link } from "gatsby"
import { routeElements } from "../../config/routeElements"
import Logo from "../../assets/icons/logo"
import instagram from "../../assets/icons/instagram.svg"
import fb from "../../assets/icons/fb.svg"
import linkedin from "../../assets/icons/linkedin.svg"
import Layout from "../Layout"
import styles from "./styles.module.scss"

export const Footer: React.FC = () => {
    return (
        <footer>
            <Layout>
                <nav>
                    <div>
                        <Logo color="white"/>
                        <div>
                            <img src={fb} alt="" />
                            <img src={instagram} alt="" />
                            <img src={linkedin} alt="" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className={styles.footer__item}>Астана, пр. Мангилик ел, 20 (БЦ "Palazzo degli Affari"), 410 офис.</div>
                            <div className={styles.footer__item}>+7 700 333 06 45</div>
                        </div>
                        <div className={styles.email}>info@mssp.global</div>
                    </div>
                    <div className={styles.routes}>
                        <div className={styles.footer__item}>Продукты и услуги</div>
                        <div className={styles.footer__item}>О нас</div>
                        <div className={styles.footer__item}>Новости</div>
                        <div className={styles.footer__item}>Вакансии</div>
                        <div className={styles.footer__item}>Наши реквизиты</div>
                    </div>
                    <div className={styles.routes}>
                        <div className={styles.footer__item}>Read team</div>
                        <div className={styles.footer__item}>Blue team</div>
                        <div className={styles.footer__item}>Consulting</div>
                        <div className={styles.footer__item}>MSS-услуги</div>
                        <div className={styles.footer__item}>Подбор и внедрение СЗИ</div>
                        <div className={styles.footer__item}>Research Laboratory</div>
                        <div className={styles.footer__item}>Наши решения</div>
                    </div>
                </nav>
            </Layout>
        </footer>
    )
}