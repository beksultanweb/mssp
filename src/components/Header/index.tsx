import React from "react"
import { Link } from "gatsby"
import { routeElements } from "../../config/routeElements"
import Logo from "../../assets/icons/logo"
import Arrow from "../../assets/icons/arrow"
import "./styles.module.scss"

export const Header: React.FC = () => {
    return (
        <header>
            <Link to={"/"}><Logo/></Link>
            {routeElements.map(route => (
                <Link to={route.url}>{route.text}</Link>
            ))}
            <button>Войти<Arrow/></button>
        </header>
    )
}