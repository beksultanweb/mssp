import { navigate, PageProps } from 'gatsby'
import { inject, observer } from 'mobx-react'
import React from 'react'

import { AuthStore } from '../store/AuthStore'

interface PrivateRouteProps extends PageProps {
    authStore: AuthStore,
    allowedRoles: any
    component: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ authStore, allowedRoles, component: Component, ...rest }) => {
    if(authStore.user.roles?.find(role => allowedRoles.includes(role))) {
        return <Component {...rest} />
    }
    navigate('/')
    return null
}

export default inject('authStore')(observer(PrivateRoute))