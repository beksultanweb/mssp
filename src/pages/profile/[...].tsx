import { Router } from '@reach/router'

import PrivateRoute from '../../components/PrivateRoute'
import profile from '../../components/profile'
import request from '../../components/profile/request'


const ROLES = {
    'User': 2001
  }

const Profile = () => (
  <Router>
    <PrivateRoute allowedRoles={[ROLES.User]} path="/profile" component={profile}/>
    <PrivateRoute allowedRoles={[ROLES.User]} path="/profile/request" component={request}/>
  </Router>
)

export default Profile