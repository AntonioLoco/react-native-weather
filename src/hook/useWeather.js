import axios from 'axios';
import { useEffect, useState} from 'react'
import * as Location from 'expo-location';


const useWeather = (url, key, urlUpcoming) => {
    const [location, setLocation] = useState(null);
    const [weatherResponse, setweatherResponse] = useState(null);
    const [upcomingWeather, setUpcomingWeather] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState(null);

    const getWeather = async() => {
        //Setto il caricamento a true
        setloading(true);
        setError(null);

        //Prendo la posizione
        //Richiedo il permesso per accedere alla posizione
        let { status } = await Location.requestForegroundPermissionsAsync();

        //Se l'accesso non è sato consentito
        if (status !== 'granted') { 
            setError('Autorizzami ad accedere alla tua posizione. Altrimenti come faccio a vedere il meteo? :(');
            setloading(false);
            console.log("Errore posizione");
            return;
        }

        //Prendo la posizione corrente
        let {coords} = await Location.getCurrentPositionAsync({});
        setLocation(coords);


        //Chiamo api meteo
        try {
            let response = await axios.get(url + "&lat=" + coords.latitude + "&lon=" + coords.longitude + "&appid=" + key);
            let upcomingResponse = await axios.get(urlUpcoming + "&lat=" + coords.latitude + "&lon=" + coords.longitude + "&appid=" + key);
            setweatherResponse(response.data);
            setUpcomingWeather(upcomingResponse.data);

            //Setto il tema
            const icon = response.data.weather[0].icon;
            if(icon.includes("d")){
                setTheme(['#eaedfd', '#89a4f8'])
            } else {
                setTheme(['#4b4b4b', '#3754ad'])
            }
            setloading(false);
        } catch (error) {
            setError(error);
            setloading(false);
            console.log("Errore meteo:",error);
        }
    }


    useEffect( () => {
        getWeather();
    }, []);

    return {weatherResponse,upcomingWeather, theme, loading, error, getWeather};

}

export default useWeather