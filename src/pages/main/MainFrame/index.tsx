import React from "react"
import Layout from "../../../components/Layout"
import Arrow from "../../../assets/icons/arrow"
// import "./styles.module.scss"
import styles from "./styles.module.scss"
import { Header } from "../../../components/Header"
import mainPhoto from "../../../assets/images/main3.png"

const MainFrame = () => {
    return (
        <main>
        <img src={mainPhoto} alt="photo" className={styles.mainphoto} />
        <Layout>
            <Header/>
            <h1>Защита цифровых данных - базовая потребность современного мира</h1>
            <span>/001</span><p>Компания по обеспечению информационной безопасности</p>
            <button>Консультация<Arrow/></button>
        </Layout>
        </main>
    )
}

export default MainFrame