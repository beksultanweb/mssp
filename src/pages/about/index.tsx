import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import MainFrame from "./MainFrame"
import Header from "../../components/Header"
import ResultsFrame from "./ResultsFrame"
import TeamFrame from "./TeamFrame"
import AwardsFrame from "./AwardsFrame"
import { Footer } from "../../components/Footer"

const AboutPage: React.FC<PageProps> = () => {
  return (
    <>
      <Header theme="dark"/>
      <MainFrame/>
      <ResultsFrame/>
      <TeamFrame/>
      <AwardsFrame/>
      <Footer/>
    </>
  )
}

export default AboutPage