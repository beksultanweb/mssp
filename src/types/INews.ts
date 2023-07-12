import { IGatsbyImageData } from 'gatsby-plugin-image'

export interface INews {
    title: string
    slug: string
    news: {
        newsImg: {
            localFile: {
                childImageSharp: {
                    gatsbyImageData: IGatsbyImageData
                }
            }
        }
    }
}