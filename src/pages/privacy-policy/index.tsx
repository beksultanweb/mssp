import { useStaticQuery, PageProps, graphql } from 'gatsby'

import styles from './styles.module.scss'

import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'


const PrivacyPage: React.FC<PageProps> = () => {
    // const data = useStaticQuery(query)

  return (
    <section>
      <Header theme="light"/>
      <Layout>
      <div>
      {/* dangerouslySetInnerHTML={{ __html:  }} */}
      </div>
      </Layout>
      <Footer theme='light'/>
    </section>
  )
}

export default PrivacyPage