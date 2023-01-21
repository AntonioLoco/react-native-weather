import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'

const ErrorPage = ({message, getWeather}) => {
  return (
    <View style={styles.container}>
      <Image source={require("../img/geolocation_disabled.png")} style={styles.icon}/>
      <Text style={styles.text}>{message}</Text>
      <Button title="Ricarica" onPress={getWeather}/>
    </View>
  )
}

export default ErrorPage

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    icon: {
        width: 200,
        height: 200
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#f5f5f5",
        marginTop: 100,
        paddingHorizontal: 20,
        textAlign: "center",
        color: "#252525",
        marginBottom: 30
    }
})