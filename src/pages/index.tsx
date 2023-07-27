import { inject, observer } from 'mobx-react'
import React, { RefObject } from 'react'

import './styles.module.scss'
import ClientsFrame from './main/ClientsFrame'
import CTAFrame from './main/CTAFrame'
import DodgerFrame from './main/DodgerFrame'
import MainFrame from './main/MainFrame'
import MSSProductsFrame from './main/MSSProductsFrame'
import NewsFrame from './main/NewsFrame'
import PartnerLinkFrame from './main/PartnerLinkFrame'
import PartnerLinkFrame2 from './main/PartnerLinkFrame2'
import PenetrationTestFrame from './main/PenetrationTestFrame'
import ProductsFrame from './main/ProductsFrame'
import PromoFrame from './main/PromoFrame'

import { Footer } from '../components/Footer'
import Header from '../components/Header'
import Consultation from '../components/Modal/Consultation'
import Decipher from '../components/Modal/Decipher'
import Widget from '../components/Widget'
import { AuthStore } from '../store/AuthStore'

import type { HeadFC, PageProps } from 'gatsby'


interface IndexProps extends PageProps {
  authStore: AuthStore
}

const IndexPage: React.FC<IndexProps> = ({ authStore }) => {
  const [consultationOpen, setConsultationOpen] = React.useState(false)

  React.useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('persist') === 'true') {
      authStore?.checkAuth()
    }
  }, [])

  const handleConsultationOpen = () => {
    setConsultationOpen(!consultationOpen)
  }

  const [decipherOpen, setDecipherOpen] = React.useState(false)
  const handleDecipherOpen = () => {
      setDecipherOpen(!decipherOpen)
  }

  return (
    <>
      <main>
        <Header theme="dark"/>
        <MainFrame handleConsultationOpen={handleConsultationOpen}/>
      </main>
      <ProductsFrame/>
      <CTAFrame setDecipherOpen={setDecipherOpen} handleConsultationOpen={handleConsultationOpen}/>
      <MSSProductsFrame/>
      <PenetrationTestFrame handleConsultationOpen={handleConsultationOpen}/>
      <PartnerLinkFrame/>
      <DodgerFrame/>
      {/* <PromoFrame/> */}
      <ClientsFrame/>
      <PartnerLinkFrame2/>
      <NewsFrame/>
      <Footer/>
      <Widget handleDecipherOpen={handleDecipherOpen}/>
      {consultationOpen && <Consultation close={() => setConsultationOpen(false)}/>}
      {decipherOpen && <Decipher close={handleDecipherOpen} handleConsultationOpen={handleConsultationOpen}/>}
    </>
  )
}

export default inject('authStore')(observer(IndexPage))

export const Head: HeadFC = () => <title>Home Page</title>
