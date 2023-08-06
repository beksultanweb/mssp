import styles from './styles.module.scss'

interface IProps {
    children: JSX.Element[] | JSX.Element;
}

const Layout = (props: IProps): JSX.Element => {
    return (
        <div className={styles.primary}>
            <div>{props.children}</div>
        </div>
    )
}

export default Layout