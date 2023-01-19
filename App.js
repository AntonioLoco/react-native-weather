import { StyleSheet, View, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import useWeather from './src/hook/useWeather';
import LoadingPage from './src/view/LoadingPage';
import ErrorPage from './src/view/ErrorPage';
import Homepage from './src/view/Homepage';

const urlApi = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lang=it';
const urlApiUpcoming = 'https://api.openweathermap.org/data/2.5/forecast?&cnt=10&units=metric&lang=it';
const apiKey = 'a9882e8cc3f3edb6545531d67db0d03f';

export default function App() {
  const {weatherResponse, upcomingWeather, theme, loading, error, getWeather} = useWeather(urlApi ,apiKey, urlApiUpcoming);

  const getTheme = () => {
    if(!theme){
      return ['#eaedfd', '#89a4f8']
    } else {
      return theme;
    }
    // ['#4b4b4b', '#3754ad']
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getTheme()} 
        start={{
          x: 0,
          y: 0
        }}
        end={{
          x: 1,
          y: 1
        }}
        style={styles.background}
      >
        { loading ? <LoadingPage /> : error ? <ErrorPage message={error} /> : <Homepage weatherResponse={weatherResponse} upcomingWeather={upcomingWeather} getWeather={getWeather}/> }
      </LinearGradient>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    background: {
      width: "100%",
      height: "100%"
    }
  });

