import { graphql, useStaticQuery } from 'gatsby'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import PartnerLink from '../../../components/PartnerLink'

const query = graphql`
{
    wpPage {
      Additional_resources2 {
        additionalBtn2
        additionalDescr2
        additionalImg2 {
          gatsbyImage(width: 1200)
        }
        additionalLink2
        additionalTitle2
        
      }
    }
  }`

interface PartnerLinkProps {
  wpPage: {
    Additional_resources2: {
      additionalBtn2: string
      additionalDescr2: string
      additionalImg2: {
        gatsbyImage: IGatsbyImageData
      }
      additionalLink2: string
      additionalTitle2: string
      additionalOn2: boolean
    }
  }
}

const PartnerLinkFrame2 = () => {
    const data: PartnerLinkProps = useStaticQuery(query)
    const { additionalImg2, additionalTitle2, additionalDescr2, additionalBtn2, additionalLink2, additionalOn2 } = data.wpPage.Additional_resources2
    const image = getImage(additionalImg2)
    // if(!additionalOn2) {
    //   return
    // }
    return (
        image ? <PartnerLink image={image} title="CloudTek.kz - защищённый облачный провайдер на территории Казахстана." description="Наш партнёр помогает организовать защищённую инфраструктуру без необходимости приобретения СЗИ и серверного оборудования, а также прохождения сертификации. Fintech и E-commerce компании могут получить виртуальный дата-центр, соответствующий стандарту PCI DSS, сэкономив при этом деньги и работая напрямую с финансовыми учреждениями." link="https://cloudtek.kz" btn="Посетить сайт компании"/>
        : null
    )
}

export default PartnerLinkFrame2