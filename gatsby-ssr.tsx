import React from "react"
import type {GatsbySSR} from "gatsby"
import Logo from "./src/assets/icons/logo"
import provideStores from './provide-stores'

export const wrapRootElement = provideStores


export const onRenderBody: GatsbySSR["onRenderBody"] = ({
    setPreBodyComponents,
  setPostBodyComponents
}) => {
  setPreBodyComponents([
    // <div className="preloader">
    //     <div>
    //         <div className="preloader_title">ЗАПУСК<br/>САЙТА</div>
    //         <div className="preloader_calculation">01%</div>
    //     </div>
    //     <Logo/>
    // </div>
  ])
  setPostBodyComponents([
    <script src="preloader.js" />
  ])
}