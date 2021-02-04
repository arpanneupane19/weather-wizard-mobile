import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView, Text, View, TextInput, TouchableOpacity} from 'react-native';


export default function Weather() {
    const [weatherData, setWeatherData] = useState([{}])
    const apiKey = '<API>'
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState(true);

    const dateBuilder = (d) => {
        let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', "Oct", 'Nov', 'Dec'];
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${month} ${date}, ${year}`

    }

    return (
        <ImageBackground source={(typeof weatherData.main != 'undefined') ? (weatherData.main.temp > 50) ? require('../assets/warm-bg.jpg') : require('../assets/cold-bg.jpg') : require('../assets/cold-bg.jpg')} style={{ width: '100%', height: '105%'}}>
            <ScrollView style={styles.container}>
                <View>
                    <View style={styles.main}>
                        <TextInput
                            placeholder='Enter City...'
                            style={styles.cityInput}
                            onChangeText={text => setCity(text)}
                            value={city}
                            onSubmitEditing={() => {
                                fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
                                    response => response.json()
                                ).then(
                                    data => {
                                        setWeatherData(data);
                                        setCity('')
                                    }
                                )
                            }}
                        />



                        {(typeof weatherData.main != 'undefined') ? (
                            <View style={styles.weatherInfo}>
                                <Text style={styles.city}>{weatherData.name}, {weatherData.sys.country}</Text>
                                <Text style={styles.date}>{dateBuilder(new Date())}</Text>
                                <TouchableOpacity style={styles.weatherBox} onPress={() => unit ? setUnit(false) : setUnit(true)}>
                                    {unit ? <Text style={styles.temp}>{Math.round(weatherData.main.temp)}ºF</Text> : <Text style={styles.temp}>{Math.round((weatherData.main.temp - 32) * 5 / 9)}ºC</Text>}
                                </TouchableOpacity>
                                    {unit ? <Text style={styles.minMax}>Min: {Math.round(weatherData.main.temp_min)}ºF / Max: {Math.round(weatherData.main.temp_max)}ºF</Text> : <Text style={styles.minMax}>Min: {Math.round((weatherData.main.temp_min - 32) * 5/9)}ºC / Max: {Math.round((weatherData.main.temp_max - 32) * 5/9)}ºC</Text>}
                                <Text style={styles.weather}>{weatherData.weather[0].main}</Text>

                            </View>
                        ) : (<>
                                <View style={styles.weatherInfo}>
                                    <Text style={styles.city}>Weather Wizard</Text>
                                    <Text style={styles.date}>{dateBuilder(new Date())}</Text>
                                </View>

                            </>)}

                            {(weatherData.cod === '404') ? (
                                <Text style={{marginTop: 50, color: '#fff', fontSize: 20, textAlign: 'center', marginRight: 20, marginLeft: 20}}>No city found. Maybe try just putting the city name?</Text>
                            ): (<></>)}

                            <View style={styles.credit}>
                                <Text style={styles.myName}>Developed by <Text style={styles.fullName}>Arpan Neupane</Text></Text>
                            </View>
                            
                        
                        
                    </View>


                </View>
            </ScrollView>
        </ImageBackground>

    );
}


const styles = StyleSheet.create({

    container: {

    },

    main: {
        marginTop: 66,
        width: '100%',
        flex: 1,
        alignItems: 'center'
    },

    cityInput: {
        width: '85%',
        marginRight: '10%',
        marginLeft: '10%',
        height: 54,
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0.8)',
        color: '#000',
        fontWeight: '400',
        borderRadius: 7,
        fontSize: 20
    },

    weatherInfo: {
        marginTop: 100
    },

    city: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '300',
        textAlign: 'center',
    },

    date: {
        color: "#fff",
        fontSize: 20,
        fontWeight: '300',
        fontStyle: 'italic',
        textAlign: 'center'
    },

    weatherBox: {
        textAlign: 'center'
    },

    temp: {
        position: 'relative',
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginRight: 'auto',
        marginLeft: 'auto',
        color: "#fff",
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 25,
        paddingRight: 25,
        fontSize: 102,
        fontWeight: '600',
    },

    weather: {
        color: "#fff",
        fontSize: 48,
        fontWeight: '600',
        textAlign: 'center'
    },

    credit: {
        textAlign: 'center',
        marginTop: 50,
    },

    myName: {
        fontSize: 24,
        color: "#fff"
    },

    fullName: {
        color: "#45b6fe",
        fontStyle: 'italic',
        fontWeight: '600'
    },

    minMax: {
        color: "#fff",
        fontSize: 28,
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 25
    }

});