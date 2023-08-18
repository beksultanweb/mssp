import { Link } from 'gatsby'

import styles from './styles.module.scss'

interface Props {
    parent: string
    parentLink: string
    current: string
    category?: string
    categorySlug?: string
    className: string
}

const BreadCrumb = ({ parent, parentLink, categorySlug, current, category, className }: Props) => {

    return (
        <div className={className}>
            <Link to="/" className={styles.link}>
                <span className={styles.white_text}>Главная</span>
            </Link>
            {parent && <span className={styles.white_text}>/</span>}
            {parent && <Link to={parentLink} className={styles.link}><span className={styles.white_text}>{parent}</span></Link>}
            {category && <span className={styles.white_text}>/</span>}
            {category && <Link to={parentLink} state={{ product: categorySlug }} className={styles.link}><span className={styles.white_text}>{category}</span></Link>}
            <span className={styles.white_text}>/</span>
            <span className={`${styles.white_text} ${styles.current}`}>{current}</span>
        </div>
    )
}

export default BreadCrumb