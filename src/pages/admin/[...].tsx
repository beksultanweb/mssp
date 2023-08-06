import { Router } from '@reach/router'

import admin from '../../components/admin'
import update from '../../components/admin/update'
import PrivateRoute from '../../components/PrivateRoute'


const ROLES = {
    'Admin': 5150
  }

const Admin = () => (
  <Router>
    <PrivateRoute allowedRoles={[ROLES.Admin]} path="/admin" component={admin}/>
    <PrivateRoute allowedRoles={[ROLES.Admin]} path="/admin/update" component={update}/>
  </Router>
)

export default Admin