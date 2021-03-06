import React, {Component} from 'react'
import {StatusBar, StyleSheet, View, Text, Image} from 'react-native'

export default class Welcome extends Component {
  constructor () {
    super()
    this.state = {}
  }

  // Rendering Methods
  render () {
    return (
      <View style={styles.welcomeContainer}>
        <MyStatusBar barStyle='light-content' />
        <Image source={require('../../assets/images/Celsius_Symbol_white.png')} style={styles.logo} />
        <Text style={[{fontFamily: 'barlow-bold'}, styles.header]}>WELCOME TO CELSIUS</Text>
        <Text style={[{fontFamily: 'barlow'}, styles.text]}>
          A new global financial platform that seamlessly connects holders of crypto-assets with borrowers.
          Earn fees on your assets by allowing financial traders to borrow them.
        </Text>
      </View>
    )
  }
}

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
)

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 48
  },
  contentContainer: {
    flex: 1
  },
  header: {
    fontSize: 38,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: '#9CA9B6',
    paddingTop: 30,
    paddingBottom: 30,
    lineHeight: 20
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    marginBottom: 80,
    marginTop: 90
  }
})
