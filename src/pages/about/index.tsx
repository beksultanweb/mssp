import AwardsFrame from './AwardsFrame'
import MainFrame from './MainFrame'
import ResultsFrame from './ResultsFrame'
import TeamFrame from './TeamFrame'

import { Footer } from '../../components/Footer'
import Header from '../../components/Header'

import type { HeadFC, PageProps } from 'gatsby'

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