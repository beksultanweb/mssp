import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { getImage, IGatsbyImageData } from "gatsby-plugin-image"
import PartnerLink from "../../../components/PartnerLink"

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
    }
  }
}

const PartnerLinkFrame2 = () => {
    const data: PartnerLinkProps = useStaticQuery(query)
    const {additionalImg2, additionalTitle2, additionalDescr2, additionalBtn2, additionalLink2} = data.wpPage.Additional_resources2
    const image = getImage(additionalImg2)
    return (
        image ? <PartnerLink image={image} title={additionalTitle2} description={additionalDescr2} link={additionalLink2} btn={additionalBtn2}/>
        : null
    )
}

export default PartnerLinkFrame2