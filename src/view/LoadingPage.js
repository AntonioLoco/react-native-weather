import { Text, View, StyleSheet, Image, Dimensions } from 'react-native'
import React, { Component } from 'react'

const screenHeight = Dimensions.get('window').height;

export class LoadingPage extends Component {
  render() {
    return (
      <View style={[styles.container, {height: screenHeight}]}>
         <Image
          source={require('../img/loading.gif')}
        />
        <View style={styles.copyrightWrapper}>
          <Text style={styles.copyright}><Text style={{fontWeight: "400", fontSize: 13}}>Powerd by</Text> Antonio Locorotondo</Text>
        </View>
      </View>
    )
  }
}

export default LoadingPage

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    position: "relative"
  },
  copyrightWrapper: {
    textAlign: "center",
    position: "absolute",
    bottom: 150,
  },
  copyright: {
    color: "#252525",
    fontWeight: "600",
    fontSize: 15,
  }
})