import { graphql, useStaticQuery } from 'gatsby'
import { IGatsbyImageData, getImage } from 'gatsby-plugin-image'

import PartnerLink from '../../../components/PartnerLink'

const query = graphql`
{
    wpPage {
      Additional_resources {
        additionalBtn
        additionalDescr
        additionalImg {
          gatsbyImage(width: 1200)
        }
        additionalLink
        additionalTitle
        
      }
    }
  }`

interface PartnerLinkProps {
  wpPage: {
    Additional_resources: {
      additionalBtn: string
      additionalDescr: string
      additionalImg: {
        gatsbyImage: IGatsbyImageData
      }
      additionalLink: string
      additionalTitle: string
      additionalOn: boolean
    }
  }
}

const PartnerLinkFrame = () => {
  const data: PartnerLinkProps = useStaticQuery(query)
  const { additionalImg, additionalTitle, additionalDescr, additionalBtn, additionalLink, additionalOn } = data.wpPage.Additional_resources
  const image = getImage(additionalImg)
  // if(!additionalOn) {
  //   return
  // }
  return (
      image ? <PartnerLink image={image} title="Информационный портал кибербезопасности!" description="Мы предлагаем практические шаги для надёжной архитектуры ИБ, список лучших экспертов и широкий выбор материалов. Будьте в курсе новейших угроз и получайте рекомендации по предотвращению. Присоединяйтесь к нам и защищайте свои ценности!" link="#" btn="Открыть сайт партнера"/>
      : null
  )
}

export default PartnerLinkFrame