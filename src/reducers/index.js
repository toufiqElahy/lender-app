import { combineReducers } from 'redux'

import AppTokenReducer from './AppTokenReducer'
import LoginReducer from './LoginReducer'
import NavigatorReducer from './NavigatorReducer'
import RegisterReducer from './RegisterReducer'
import LenderReducer from './LenderReducer'
import WalletBalance from './WalletBalance'

export default combineReducers({
  auth: LoginReducer,
  nav: NavigatorReducer,
  token: AppTokenReducer,
  lender: LenderReducer,
  wallet: WalletBalance,
  register: RegisterReducer
})