import { inject, observer } from 'mobx-react'
import { useEffect, useState } from 'react'

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
import Login from '../components/Modal/Login'
import Register from '../components/Modal/Register'
import ResetPwd from '../components/Modal/ResetPwd'
import Widget from '../components/Widget'
import { AuthStore } from '../store/AuthStore'

import type { HeadFC, PageProps } from 'gatsby'



interface IndexProps extends PageProps {
  authStore: AuthStore
}

const IndexPage: React.FC<IndexProps> = ({ authStore }) => {
  const [consultationOpen, setConsultationOpen] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('token') && localStorage.getItem('persist') === 'true') {
      authStore?.checkAuth()
    }
  }, [])

  const handleConsultationOpen = () => {
    setConsultationOpen(!consultationOpen)
  }

  const [decipherOpen, setDecipherOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [resetPwdOpen, setResetPwdOpen] = useState(false)
  const handleDecipherOpen = () => {
      setDecipherOpen(!decipherOpen)
  }
  const handleLoginOpen = () => {
    setLoginOpen(!loginOpen)
  }
  const handleRegisterOpen = () => {
    setRegisterOpen(!registerOpen)
  }
  const handleResetPwdOpen = () => {
    setResetPwdOpen(!resetPwdOpen)
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
      <PenetrationTestFrame handleLoginOpen={handleLoginOpen}/>
      <PartnerLinkFrame/>
      <DodgerFrame/>
      <PromoFrame/>
      <ClientsFrame/>
      <PartnerLinkFrame2/>
      <NewsFrame/>
      <Footer/>
      <Widget handleDecipherOpen={handleDecipherOpen}/>
      {consultationOpen && <Consultation close={() => setConsultationOpen(false)}/>}
      {decipherOpen && <Decipher close={handleDecipherOpen} handleConsultationOpen={handleConsultationOpen}/>}
      {loginOpen && <Login setResetPwdOpen={handleResetPwdOpen} setRegisterOpen={handleRegisterOpen} close={handleLoginOpen}/>}
      {registerOpen && <Register setLoginOpen={handleLoginOpen} close={handleRegisterOpen}/>}
      {resetPwdOpen && <ResetPwd close={handleResetPwdOpen}/>}
    </>
  )
}

export default inject('authStore')(observer(IndexPage))

export const Head: HeadFC = () => <title>Home Page</title>
