import { inject, observer } from 'mobx-react'
import React from 'react'

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
import { AuthStore } from '../store/AuthStore'

import type { HeadFC, PageProps } from 'gatsby'

interface IndexProps extends PageProps {
  authStore: AuthStore
}

const IndexPage: React.FC<IndexProps> = ({ authStore }) => {
  React.useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('persist') === 'true') {
      authStore?.checkAuth()
    }
  }, [])

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
      {/* <PromoFrame/> */}
      <ClientsFrame/>
      <PartnerLinkFrame2/>
      <NewsFrame/>
      <Footer/>
    </>
  )
}

export default inject('authStore')(observer(IndexPage))

export const Head: HeadFC = () => <title>Home Page</title>
