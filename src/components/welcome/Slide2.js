import React, { Component } from 'react'
import { Platform, StyleSheet, View, Text, Image } from 'react-native'
import { Font } from 'expo';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fontLoaded: false,
      }
  }

  async componentDidMount() {
    await Font.loadAsync({
      'inconsolata': require('../../../assets/fonts/Inconsolata-Regular.ttf'),
    });
    await Font.loadAsync({
      'barlow-semi-bold': require('../../../assets/fonts/Barlow-SemiBold.otf'),
    });
    await Font.loadAsync({
      'barlow-light': require('../../../assets/fonts/Barlow-Light.otf'),
    });
    await Font.loadAsync({
      'barlow-bold': require('../../../assets/fonts/Barlow-Bold.otf'),
    });
    await Font.loadAsync({
      'barlow': require('../../../assets/fonts/Barlow-Regular.otf'),
    });
    this.setState({ fontLoaded: true });
  }

  render () {
    return (
      <View style={styles.slideContainer}>
        <Image source={require('../../../assets/images/icon-wallet-slide.png')} style={styles.icon} />
        { this.state.fontLoaded ? (<Text style={[{ fontFamily: 'barlow'}, styles.text]}>Members who deposit coins in their Celsius Wallets will earn Degree Tokens as a reward for lending to the network.</Text>) : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    color: '#9CA9B6',
    paddingTop: 30,
    paddingBottom: 30,
    lineHeight: 20,
    marginLeft: 40,
    marginRight: 40,
    textAlign: 'center'
  },
  icon: {
    // justifyContent: 'center',
    // alignItems: 'center',
    width: 186,
    height: 186,
    // marginLeft: 15,
    marginBottom: 10,
    marginTop: 20,
    resizeMode: 'contain',
  }
})
