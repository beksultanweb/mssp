import axios from 'axios'
import { PageProps, navigate } from 'gatsby'
import { inject, observer } from 'mobx-react'
import React from 'react'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import download from '../../assets/icons/download.svg'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import RequestsService from '../../services/requests'
import { AuthStore } from '../../store/AuthStore'
import { RequestsStore } from '../../store/RequestsStore'


interface ProfileProps extends PageProps {
    authStore: AuthStore
    requestsStore: RequestsStore
}

const Update: React.FC<ProfileProps> = ({ authStore, requestsStore, location }) => {
    const [dropdownOpened, setDropdownOpened] = React.useState(false)
    const [fileData, setFileData] = React.useState<FileList | null>(null)
    const [success, setSuccess] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')
    // if(!authStore.isAuth) {
    //     navigate('/')
    // }

    React.useEffect(() => {
        authStore.checkAuth()
    }, [])

    React.useEffect(() => {
        if(location.state) {
            requestsStore.getRequest(location.state.requestId)
            requestsStore.getUserInfo(location.state.author)
        }
    }, [requestsStore])

    const { title, status, paid, phone, domain } = requestsStore.request
    const { email, firstName, secondName } = requestsStore.user

    const color = `${status === 'новая'?styles.blue:status === 'в работе'?styles.green:status === 'исполнена'?styles.fiolet:status === 'закрыта'?styles.black:status==='отменена'?styles.red:''}`

    const handleOpenedDropdown = () => {
        setDropdownOpened(!dropdownOpened)
    }

    const handleUpdateStatus = (status: string) => {
        requestsStore.updateStatus(requestsStore.request._id, status)
    }

    const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileData(e.target.files)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(fileData) {
            const files = new FormData()

            for (let i = 0; i < fileData.length; i++) {
                files.append(fileData[i].name, fileData[i])
            }
            try {
                const response = await RequestsService.uploadFiles(requestsStore.request._id, files)
                setSuccess(response.data.message)
            } catch (error) {
                if(axios.isAxiosError(error) && error.response) {
                    setErrMsg(error.response.data.message)
                }
            }
        }
    }

    if(authStore.user.roles?.includes(5150) === false) {
        navigate('/')
        return null
    }
    return (
        <section className={styles.profile}>
            <Header theme="light"/>
            <Layout>
                <div className={styles.flex}>
                    <div>
                        <h2 className={styles.title}>{title}</h2>
                        <div className={styles.request__status}>
                            <div className={styles.request__status_item}>
                                <div className={styles.title}>Статус заявки</div>
                                <div className={`${styles.status} ${styles.status__light}`}><div className={`${styles.circle} ${color} ${styles.circle__doing}`}></div>{status}</div>
                            </div>
                            <div className={styles.request__status_item}>
                                <div className={styles.title}>Статус оплаты</div>
                                <div className={styles.title}>{paid === false ? 'Не оплачен' : 'Оплачен'}</div>
                            </div>
                            {phone && <div className={styles.request__status_item}>
                                <div className={styles.title}>Номер телефона</div>
                                <div className={`${styles.status} ${styles.status__light}`}>{phone}</div>
                            </div>}
                            {domain && <div className={styles.request__status_item}>
                                <div className={styles.title}>Домен</div>
                                <div className={`${styles.status} ${styles.status__light}`}>{domain}</div>
                            </div>}
                        </div>
                    </div>
                    <button onClick={handleOpenedDropdown} className={styles.btnLight}>Изменить статус<Arrow theme="light"/></button>
                    {dropdownOpened &&
                    <div className={styles.status__dropdown_menu}>
                        <div onClick={() => handleUpdateStatus('в работе')} className={styles.status}><div className={`${styles.circle} ${styles.circle__doing}`}></div>в работе</div>
                        <div onClick={() => handleUpdateStatus('новая')} className={styles.status}><div className={`${styles.circle} ${styles.circle__new}`}></div>новая</div>
                        <div onClick={() => handleUpdateStatus('исполнено')} className={styles.status}><div className={`${styles.circle} ${styles.circle__done}`}></div>исполнена</div>
                        <div onClick={() => handleUpdateStatus('закрыта')} className={styles.status}><div className={`${styles.circle} ${styles.circle__closed}`}></div>закрыта</div>
                        <div onClick={() => handleUpdateStatus('отменена')} className={styles.status}><div className={`${styles.circle} ${styles.circle__canceled}`}></div>отменена</div>
                    </div>}
                </div>
                <div>
                    <div className={styles.request__status}>
                        {email && <div className={styles.request__status_item}>
                            <div className={styles.title}>Email клиента</div>
                            <div className={`${styles.status} ${styles.status__light}`}>{email}</div>
                        </div>}
                        {firstName && <div className={styles.request__status_item}>
                            <div className={styles.title}>Фамилия Имя</div>
                            <div className={`${styles.status} ${styles.status__light}`}>{firstName} {secondName}</div>
                        </div>}
                    </div>
                </div>
            </Layout>
            <section className={styles.document}>
                <Layout>
                    <div className={styles.document__content}>
                        <h3 className={styles.document__title}>Документы</h3>
                        <form onSubmit={handleSubmit} encType='multipart/form-data' className={styles.document__flex}>
                            <div className={styles.document__item}>
                                <input type='file' onChange={fileChangeHandler} multiple className={styles.request__btn}/>
                                <button>Загрузить<Arrow theme='dark'/></button>
                            </div>
                            {errMsg && <div>{errMsg}</div>}
                            {success && <div>{success} {fileData.length > 1 ? 'успешно загружены' : 'успешно загружен'}</div>}
                        </form>
                    </div>
                </Layout>
            </section>
            <Layout>
                <div className={styles.comments}>
                    <h3 className={styles.comments__title}>Комментарии</h3>
                    <p className={styles.comments__descr}>Команда c большим практическим опытом,  подтвержденным международными  сертификатами OSCP, CEH, CHFI, WAST, OSCP, ISO и свидетельствами государственного  образца в области защиты информации</p>
                </div>
            </Layout>
            <Footer theme="light"/>
        </section>
    )
}

export default inject('authStore', 'requestsStore')(observer(Update))