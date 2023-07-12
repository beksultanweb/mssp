import { Provider } from 'mobx-react'
import React from 'react'

import authStore from './src/store/AuthStore'
import requestsStore from './src/store/RequestsStore'

export default ({ element }) => (
  <Provider authStore={authStore} requestsStore={requestsStore}>{element}</Provider>
)