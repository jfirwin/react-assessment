import React from 'react'
import {Switch, Route} from 'react-router-dom'

import List from './components/List.js'
import Detailed from './components/Detailed.js'

export default (
  <Switch>
    <Route component={List} path='/' exact/>
    <Route component={Detailed} path='/details/:id' exact/>
  </Switch>
)
