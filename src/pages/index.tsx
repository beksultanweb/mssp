import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import "./styles.module.scss"
import MainFrame from "./main/MainFrame"
import ProductsFrame from "./main/ProductsFrame"
import { Footer } from "../components/Footer"
import CTAFrame from "./main/CTAFrame"
import MSSProductsFrame from "./main/MSSProductsFrame"
import PenetrationTestFrame from "./main/PenetrationTestFrame"
import PartnerLinkFrame from "./main/PartnerLinkFrame"
import PartnerLinkFrame2 from "./main/PartnerLinkFrame2"
import DodgerFrame from "./main/DodgerFrame"
import ClientsFrame from "./main/ClientsFrame"
import NewsFrame from "./main/NewsFrame"
import Header from "../components/Header"
import PromoFrame from "./main/PromoFrame"

const IndexPage: React.FC<PageProps> = () => {

  return (
    <>
      <main>
        <Header theme="dark"/>
        <MainFrame/>
      </main>
      <ProductsFrame/>
      <CTAFrame/>
      <MSSProductsFrame/>
      <PenetrationTestFrame/>
      <PartnerLinkFrame/>
      <DodgerFrame/>
      <PromoFrame/>
      <ClientsFrame/>
      <PartnerLinkFrame2/>
      <NewsFrame/>
      <Footer/>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
