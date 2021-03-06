import React, {Component} from 'react'
import {connect} from 'react-redux'
import {ImageBackground, StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'
import {Content, Container} from 'native-base'
import {Pages} from 'react-native-pages'
import DegIncome from './graph/DegIncome'
import DegValue from './graph/DegValue'
import IncomeHistory from './graph/IncomeHistory'
import {
  fetchWalletBalance,
  fetchTransactionsHistory,
  setActiveTransaction,
  lenderAppInitToken,
  isAlreadyLoggedIn
} from '../actions'
import Sentry from 'sentry-expo'

class Home extends Component {
  constructor () {
    super()

    this.state = {
      eth: 10.000,
      deg: 2.984,
      change: ' ▲ +3.24%',
      user: {
        name: 'Alex'
      },
      isAlreadyLogged: false
    }

    this.fetchingBalanceInterval = null
  }

  // Component Lifecycle Methods
  componentWillMount () {
    const {props} = this

    isAlreadyLoggedIn(this.props.authId).then(isAlreadyLogged => {
      this.setState({isAlreadyLogged})
    }).catch(error => {
      console.error(error)
    })

    props.fetchWalletBalance(props.walletAddress, props.token)
    this.fetchingBalanceInterval = setInterval(() => {
      props.fetchWalletBalance(props.walletAddress, props.token)
    }, 60000)
  }

  componentDidMount () {
    const {email, authId, surname} = this.props

    Sentry.setUserContext({
      email,
      userID: authId,
      surname
    })
  }

  componentWillReceiveProps (nextProps) {
    this.props = nextProps
  }

  componentWillUnmount () {
    clearInterval(this.fetchingBalanceInterval)
  }

  // Rendering methods
  render () {
    const {navigate} = this.props.navigation
    const ethBalance = this.props.ethBalance || '0.00'
    const celBalance = this.props.celBalance || '0.00'
    const name = this.props.lender.name

    if (parseFloat(ethBalance) === 0) {
      return (
        <View style={styles.container}>
          <ImageBackground source={require('../assets/images/background-blur.png')} style={styles.background}>
            <View style={styles.body}>
              <View style={[styles.row, {marginBottom: 20, marginTop: 60}]}>
                <TouchableOpacity onPress={() => navigate('Home')}>
                  <View style={styles.cellLeft}>
                    <Image source={require('../assets/images/Celsius_Symbol_white.png')} style={styles.logo} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('EditProfile')}>
                  <View style={styles.cellRight}>
                    <Image source={require('../assets/images/icon-user.png')} style={styles.user} />
                  </View>
                </TouchableOpacity>
              </View>
              <Container style={styles.wrapper}>
                <Content>
                  <Text style={styles.header}>
                    <Text>{ethBalance} ETH</Text>
                  </Text>
                  <Text style={styles.header2}>
                    <Text>{celBalance} CEL</Text>
                  </Text>
                  <View style={styles.btnsContainer}>
                    <View>
                      <TouchableOpacity style={[styles.button, {width: 150, height: 50, marginLeft: 113, marginTop: 30, marginBottom: 47}]} onPress={() => navigate('AddFunds')}>
                        <Text style={[styles.buttonText, {fontFamily: 'barlow-medium', fontSize: 21}]}>Add funds</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.hr} />

                  <Text style={styles.welcomeTitle}>Welcome to Celsius, {name}!</Text>
                  <Text style={styles.welcomeText}>As a member of Celsius community, you can lend ETH and earn DEG token
                    for the time you spend with us.</Text>
                  <View style={styles.hr} />
                  <TouchableOpacity style={styles.box}>
                    <View style={styles.boxIconWrapper}>
                      <Image source={require('../assets/images/icon-wallet.png')} style={styles.icon} />
                    </View>
                    <View style={styles.boxTextWrapper}>
                      <Text style={styles.boxText}>Transfer funds to your newly created Celsius wallet to start earning
                        more on top of it.</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.box}>
                    <View style={styles.boxIconWrapper}>
                      <Image source={require('../assets/images/icon-transfer.png')} style={styles.icon} />
                    </View>
                    <View style={styles.boxTextWrapper}>
                      <Text style={styles.boxText}>By lending money to borrowers, you earn Degree which you can later on
                        sell on the market.</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.box}>
                    <View style={styles.boxIconWrapper}>
                      <Image source={require('../assets/images/icon-network.png')} style={styles.icon} />
                    </View>
                    <View style={styles.boxTextWrapper}>
                      <Text style={styles.boxText}>Improve your seniority score by sticking longer with Celsius and earn
                        more Degree.</Text>
                    </View>
                  </TouchableOpacity>
                </Content>
              </Container>
            </View>
          </ImageBackground>
        </View>

      )
    } else {
      return (
        <View style={stylesGraph.container}>
          <ImageBackground
            source={require('../assets/images/background.png')}
            style={stylesGraph.background}>
            <View style={stylesGraph.header}>
              <View style={stylesGraph.cellLeft}>
                <TouchableOpacity onPress={() => navigate('Home')}>
                  <Image source={require('../assets/images/logo-small.png')} style={stylesGraph.logo} />
                </TouchableOpacity>
              </View>
              <View style={stylesGraph.cellRight}>
                <TouchableOpacity onPress={() => navigate('EditProfile')}>
                  <Image source={require('../assets/images/icon-user.png')} style={stylesGraph.user} />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={stylesGraph.headerText}>
              <Text style={[{fontFamily: 'barlow-semi-bold'}]}>{ethBalance} ETH</Text>
            </Text>
            <Text style={stylesGraph.header2Text}>
              <Text style={[{fontFamily: 'barlow-light'}]}>{celBalance} CEL</Text>
              <Text style={[stylesGraph.changeUp, {fontFamily: 'barlow-light'}]}> {this.state.change}</Text>
            </Text>

            <View style={stylesGraph.row}>
              <View style={stylesGraph.buttonCellLeft}>
                <TouchableOpacity style={stylesGraph.button} onPress={() => navigate('AddFunds')}>
                  <Text style={stylesGraph.buttonText}>Add funds</Text>
                </TouchableOpacity>
              </View>
              <View style={stylesGraph.buttonCellRight}>
                <TouchableOpacity style={stylesGraph.button2} onPress={() => navigate('ManageFunds')}>
                  <Text style={stylesGraph.button2Text}>Manage</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={stylesGraph.pagesWrapper}>
              <Pages style={stylesGraph.pages}>
                <DegIncome navigation={this.props.navigation} lenderAppInitToken={this.props.lenderAppInitToken} />
                <DegValue navigation={this.props.navigation} lenderAppInitToken={this.props.lenderAppInitToken} />
                <IncomeHistory
                  navigation={this.props.navigation}
                  lenderAppInitToken={this.props.lenderAppInitToken}
                  fetchTransactionsHistory={this.props.fetchTransactionsHistory}
                  transactions={this.props.transactions}
                  setActiveTransaction={this.props.setActiveTransaction}
                  walletAddress={this.props.lender.walletAddress}
                />
              </Pages>
            </View>
          </ImageBackground>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 0,
    marginRight: 0
  },
  background: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 1,
    marginTop: 20
  },
  line: {
    borderRadius: 2,
    height: 4,
    marginBottom: 10
  },
  lineInner: {
    width: '100%',
    borderRadius: 4,
    height: 4
  },
  header: {
    fontSize: 36,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 0,
    textAlign: 'center',
    marginTop: 10
  },
  header2: {
    fontSize: 22,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#9CA9B6',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 0
  },
  cellLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    height: 40
  },
  cellRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    height: 40
  },
  logo: {
    width: 35,
    height: 34,
    marginLeft: 15
  },
  user: {
    width: 26,
    height: 28,
    marginRight: 15,
    resizeMode: 'contain'
  },
  text: {
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#9ca9b7',
    paddingLeft: 30,
    paddingRight: 30,
    lineHeight: 20,
    textAlign: 'left',
    marginTop: 20,
    marginBottom: 20
  },
  agreeCheckBox: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderWidth: 0
  },
  agreeText: {
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#9ca9b7'
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    height: 40,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'stretch'
  },
  buttonText: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'barlow-medium'
  },
  hr: {
    height: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  welcomeTitle: {
    marginLeft: 36,
    marginRight: 36,
    marginBottom: 10,
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'barlow'
  },
  welcomeText: {
    marginLeft: 36,
    marginRight: 36,
    marginTop: 10,
    marginBottom: 10,
    color: '#9CA9B6',
    fontSize: 18,
    fontFamily: 'barlow'
  },
  box: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    height: 80,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginLeft: 15
  },
  boxText: {
    color: '#ffffff',
    fontSize: 16,
    paddingRight: 10,
    fontFamily: 'barlow'
  },
  boxIconWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 0
  },
  boxTextWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 0
  },
  btnsContainer: {
    flexDirection: 'row'
  },
  button2: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    height: 40,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: 'stretch'
  },
  button2Text: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 16
  }
})

const stylesGraph = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 15,
    marginTop: 40
  },
  headerText: {
    fontSize: 42,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  row: {
    height: 60,
    flexDirection: 'row'
  },
  header2Text: {
    fontSize: 24,
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#9CA9B6',
    paddingLeft: 30,
    paddingRight: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0
  },
  changeUp: {
    fontSize: 18,
    color: '#47CA53'
  },
  changeDown: {
    fontSize: 18,
    color: '#ff3333'
  },
  pagesWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 35
  },
  pages: {
    flex: 1
  },
  cellLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginLeft: 10,
    height: 40
  },
  cellRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
    height: 40
  },
  buttonCellLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginLeft: 23,
    height: 50
  },
  buttonCellRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'stretch',
    marginRight: 23,
    height: 50
  },
  logo: {
    width: 34,
    height: 34,
    marginLeft: 15
  },
  user: {
    width: 26,
    height: 29,
    marginRight: 15,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 38,
    paddingBottom: 12,
    color: '#fff'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  background: {
    flex: 1,
    paddingBottom: 20
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    height: 50,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    color: '#333333',
    fontSize: 20
  },
  button2: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    height: 50,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  button2Text: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 20,
    fontFamily: 'barlow-medium'
  }
})

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    name: state.auth.name,
    surname: state.auth.surname,
    email: state.auth.email,
    authId: state.auth.authId,
    walletAddress: state.lender.walletAddress,
    lender: state.lender,
    ethBalance: state.wallet.ethBalance,
    celBalance: state.wallet.celBalance,
    transactions: state.transactions.transactions
  }
}

const mapDispatchToProps = {
  fetchWalletBalance,
  fetchTransactionsHistory,
  lenderAppInitToken,
  setActiveTransaction,
  isAlreadyLoggedIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
