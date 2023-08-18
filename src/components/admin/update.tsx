import axios from 'axios'
import { PageProps } from 'gatsby'
import { inject, observer } from 'mobx-react'
import { useState, FC, useEffect } from 'react'

import styles from './styles.module.scss'

import Arrow from '../../assets/icons/arrow'
import { Footer } from '../../components/Footer'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import RequestsService from '../../services/requests'
import { AuthStore } from '../../store/AuthStore'
import { RequestsStore } from '../../store/RequestsStore'
import { RequestsResponse } from '../../types/RequestsResponse'


interface ProfileProps extends PageProps {
    authStore: AuthStore
    requestsStore: RequestsStore
}

const Update: FC<ProfileProps> = ({ authStore, requestsStore, location }) => {
    const [dropdownOpened, setDropdownOpened] = useState(false)
    const [fileData, setFileData] = useState<FileList | null>(null)
    const [success, setSuccess] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [request, setRequest] = useState<RequestsResponse>()

    useEffect(() => {
        if(location.state) {
            requestsStore.getRequest(location.state.requestId)
            requestsStore.getUserInfo(location.state.author)
        }
    }, [requestsStore])

    const handleUpdateStatus = (status: string) => {
        requestsStore.updateStatus(requestsStore.request._id, status)
        setDropdownOpened(false)
    }

    useEffect(() => {
        setRequest(requestsStore.request)
    }, [requestsStore.request])

    const { email, name } = requestsStore.user

    const color = `${request?.status === 'новая'?styles.blue:request?.status === 'в работе'?styles.green:request?.status === 'исполнено'?styles.fiolet:request?.status === 'закрыта'?styles.black:request?.status==='отменена'?styles.red:''}`

    const handleOpenedDropdown = () => {
        setDropdownOpened(!dropdownOpened)
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

    return (
        <section className={styles.profile}>
            <Header theme="light"/>
            <Layout>
                <div className={styles.flex}>
                    <div>
                        <h2 className={styles.title}>{request?.title}</h2>
                        <div className={styles.request__status}>
                            <div className={styles.request__status_item}>
                                <div className={styles.title}>Статус заявки</div>
                                <div className={`${styles.status} ${styles.status__light}`}><div className={`${styles.circle} ${color}`}></div>{request?.status}</div>
                            </div>
                            <div className={styles.request__status_item}>
                                <div className={styles.title}>Статус оплаты</div>
                                <div className={styles.title}>{request?.paid === false ? 'Не оплачен' : 'Оплачен'}</div>
                            </div>
                            {request?.phone && <div className={styles.request__status_item}>
                                <div className={styles.title}>Номер телефона</div>
                                <div className={`${styles.status} ${styles.status__light}`}>{request?.phone}</div>
                            </div>}
                            {request?.domain && <div className={styles.request__status_item}>
                                <div className={styles.title}>Домен</div>
                                <div className={`${styles.status} ${styles.status__light}`}>{request?.domain}</div>
                            </div>}
                        </div>
                    </div>
                    <div>
                        <button onClick={handleOpenedDropdown} className={styles.btnLight}>Изменить статус<Arrow theme="light"/></button>
                        {dropdownOpened &&
                        <div className={`${styles.status__dropdown_menu} ${styles.update_status}`}>
                            <div onClick={() => handleUpdateStatus('в работе')} className={styles.status}><div className={`${styles.circle} ${styles.green}`}></div>в работе</div>
                            <div onClick={() => handleUpdateStatus('новая')} className={styles.status}><div className={`${styles.circle} ${styles.blue}`}></div>новая</div>
                            <div onClick={() => handleUpdateStatus('исполнено')} className={styles.status}><div className={`${styles.circle} ${styles.fiolet}`}></div>исполнена</div>
                            <div onClick={() => handleUpdateStatus('закрыта')} className={styles.status}><div className={`${styles.circle} ${styles.black}`}></div>закрыта</div>
                            <div onClick={() => handleUpdateStatus('отменена')} className={styles.status}><div className={`${styles.circle} ${styles.red}`}></div>отменена</div>
                        </div>}
                    </div>
                </div>
                <div>
                    <div className={styles.request__status}>
                        {email && <div className={styles.request__status_item}>
                            <div className={styles.title}>Email клиента</div>
                            <div className={`${styles.status} ${styles.status__light}`}>{email}</div>
                        </div>}
                        {name && <div className={styles.request__status_item}>
                            <div className={styles.title}>Контактное лицо</div>
                            <div className={`${styles.status} ${styles.status__light}`}>{name}</div>
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