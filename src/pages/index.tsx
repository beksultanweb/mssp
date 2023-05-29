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
import DodgerFrame from "./main/DodgerFrame"
import JoinUsFrame from "./main/JoinUsFrame"
import ClientsFrame from "./main/ClientsFrame"
import NewsFrame from "./main/NewsFrame"

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <MainFrame/>
      <ProductsFrame/>
      <CTAFrame/>
      <MSSProductsFrame/>
      <PenetrationTestFrame/>
      <PartnerLinkFrame/>
      <DodgerFrame/>
      <JoinUsFrame/>
      <ClientsFrame/>
      <NewsFrame/>
      <Footer/>
    </>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
