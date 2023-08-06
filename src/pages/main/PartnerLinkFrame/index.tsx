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
    }
  }
}

const PartnerLinkFrame = () => {
  const data: PartnerLinkProps = useStaticQuery(query)
  const { additionalImg, additionalTitle, additionalDescr, additionalBtn, additionalLink } = data.wpPage.Additional_resources
  const image = getImage(additionalImg)
  return (
      image ? <PartnerLink image={image} title={additionalTitle} description={additionalDescr} link={additionalLink} btn={additionalBtn}/>
      : null
  )
}

export default PartnerLinkFrame