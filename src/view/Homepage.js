import { StyleSheet, Text, View, Dimensions, Image, ScrollView, TouchableOpacity, FlatList, Platform} from 'react-native'
import React from 'react'
import { WEATHER_IMAGES } from '../imagesPath';


const Homepage = ({weatherResponse , upcomingWeather, getWeather}) => {
    const moment = require('moment');
    console.log(weatherResponse);
    const sunriseHour = moment.unix(weatherResponse.sys.sunrise).format("HH:mm");
    const sunsetHour = moment.unix(weatherResponse.sys.sunset).format("HH:mm");

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.sectionTop}>
                <TouchableOpacity style={styles.btnRicharge} onPress={getWeather}>
                    <Image source={require("../icons/arrow-rotate-left-solid.png")} style={styles.btnLoader}/>
                </TouchableOpacity>
                <Image source={WEATHER_IMAGES[weatherResponse.weather[0].icon].uri} style={styles.icon}/>
                <View style={styles.descriptionBox}>
                    <Text style={styles.city}>{weatherResponse.name}</Text>
                    <Text style={styles.temperature}>{Math.floor(weatherResponse.main.temp)}°</Text>
                    <Text style={styles.info}>{ weatherResponse.weather[0].description }</Text>
                    <View style={styles.boxTemperatureMinMax}>
                        <Text style={[styles.info, { marginHorizontal: 10 }]}>MIN: {Math.floor(weatherResponse.main.temp_min)}°</Text>
                        <Text style={[styles.info, { marginHorizontal: 10 }]}>MAX: {Math.floor(weatherResponse.main.temp_max)}°</Text>
                    </View>
                </View>
            </View>
            <View style={styles.sectionBottom}>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    style={styles.upcomingBox}
                    horizontal={true}
                    data={upcomingWeather.list}
                    renderItem={({ item, index}) => 
                        <View style={styles.upcomingHour}>
                            <Text style={{fontSize: 15, fontWeight: "600", marginBottom: Platform.OS == "android" ? 10 : 0}}>{ index == 0 ? "Adesso" : moment.unix(item.dt - 1).format("HH")}</Text>
                            <Image source={WEATHER_IMAGES[item.weather[0].icon].uri} style={{width: 40, height: 40, resizeMode: "contain"}}/>
                            { (item.pop * 100 ) > 10 ? <Text style={{fontSize: 12, fontWeight: "600"}}>{Math.floor(item.pop * 100 )}%</Text> : <Text></Text> }
                            <Text style={{fontSize: 20, fontWeight: "700"}}>{Math.floor(item.main.temp)}°</Text>
                        </View> 
                    }
                />
                <View style={styles.infoBox}>
                    <View style={styles.box}>
                        <Text style={styles.boxName}>ALBA</Text>
                        <Image source={require("../icons/alba.png")} style={styles.iconBox}/>
                        <Text style={styles.textBox}>{sunriseHour}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxName}>TRAMONTO</Text>
                        <Image source={require("../icons/tramonto.png")} style={styles.iconBox}/>
                        <Text style={styles.textBox}>{sunsetHour}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxName}>VENTO</Text>
                        <Image source={require("../icons/wind.png")} style={[styles.iconBox, { transform: [{ rotate: `${weatherResponse.wind.deg}deg` }] }]}/>
                        <Text style={styles.textBox}>{weatherResponse.wind.speed}<Text style={{fontSize: 20, fontWeight: "700"}}>m/s</Text></Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxName}>VISIBILITA'</Text>
                        <Image source={require("../icons/visibile.png")} style={styles.iconBox}/>
                        <Text style={styles.textBox}>{(weatherResponse.visibility) / 1000}<Text style={{fontSize: 20, fontWeight: "700"}}>Km</Text></Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxName}>UMIDITA'</Text>
                        <Image source={require("../icons/umidità.png")} style={styles.iconBox}/>
                        <Text style={styles.textBox}>{weatherResponse.main.humidity}<Text style={{fontSize: 20, fontWeight: "700"}}>%</Text></Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.boxName}>PRESSIONE</Text>
                        <Image source={require("../icons/barometro.png")} style={styles.iconBox}/>
                        <Text style={styles.textBox}>{weatherResponse.main.pressure}<Text style={{fontSize: 20, fontWeight: "700"}}>hPa</Text></Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Homepage

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    sectionTop: {
        width: "100%",
        alignItems: "center",
        position: "relative"
    },
    btnRicharge: {
        position: "absolute",
        left: 20,
        top: 60,
    },
    btnLoader: {
        width: 25,
        height: 25
    },
    icon: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    descriptionBox: {
        width: "100%",
        alignItems: "center",
        marginTop:  -50,
    },
    city: {
        fontSize: 30,
        fontWeight: "600",
    },
    temperature: {
        fontSize: 120,
        fontWeight: "700",
        marginLeft: 10,
        marginTop: -15
    },
    info: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: -10
    },
    boxTemperatureMinMax: {
        flexDirection: "row",
        margin: 20
    },
    sectionBottom: {
        width: "100%",
        alignItems: "center",
        marginBottom: 50
    },
    upcomingBox: {
        width: Dimensions.get("window").width - 20,
        height: (Dimensions.get("window").width - 20) / 3,
        backgroundColor: "#ffffff1a",
        marginBottom: 10,
        borderRadius: 30,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    upcomingHour: {
        width: 60, 
        height: "100%", 
        alignItems: "center",
        justifyContent: "space-around",
    },
    infoBox: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "space-around"
    },
    box: {
        width: ((Dimensions.get("window").width) / 2) - 20 ,
        height: ((Dimensions.get("window").width) / 2) - 20,
        backgroundColor: "#ffffff1a",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        padding: 20
    },
    boxName: {
        fontSize: 13,
        alignSelf: "flex-start",
        color: "#26262680",
        marginBottom: 10
    },
    iconBox: {
        width: 50,
        height: 50,
        resizeMode: "contain"
    },
    textBox: {
        fontSize: 35,
        fontWeight: "500",
        marginTop: 20,
        textAlign: "center"
    }
})