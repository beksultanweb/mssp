import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import { navigate } from "gatsby";
import NewPwd from "../../components/Modal/NewPwd";

const PasswordReset = () => {

    useEffect(() => {
        if(!location.pathname.split('/')[2] && !location.pathname.split('/')[3]) {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <Header theme="dark"/>
            <Layout>
                <NewPwd userId={location.pathname.split('/')[2]} token={location.pathname.split('/')[3]}/>
            </Layout>
            <Footer/>
        </div>
    )
}

export default PasswordReset