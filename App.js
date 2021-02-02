import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView, Text, View, TextInput, TouchableOpacity } from 'react-native';


export default function App() {
    const [weatherData, setWeatherData] = useState([{}])
    const apiKey = '<API>'
    const [city, setCity] = useState('');
    const [unit, setUnit] = useState(true);

    const dateBuilder = (d) => {
        let months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', "Oct", 'Nov', 'Dec'];

        let date = d.getDate();
        let month = months[d.getMonth()];

        return `Today, ${date} ${month}`
    }

    return (
        <ImageBackground source={(typeof weatherData.main != 'undefined') ? (weatherData.main.temp > 50) ? require('./assets/warm-bg.png') : require('./assets/cold-bg.png') : require('./assets/cold-bg.png')} style={{ width: '100%', height: '100%' }}>
            <ScrollView>
            <View style={styles.container}>
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
                    <Text style={styles.date}>{dateBuilder(new Date())}</Text>

                    {(typeof weatherData.main != 'undefined') ? (
                        <View>
                            <Text style={styles.city}>{weatherData.name}, {weatherData.sys.country}</Text>

                            <TouchableOpacity style={styles.tempInfo} onPress={() => unit ? setUnit(false) : setUnit(true)}>
                                {unit ? <Text style={styles.temp}>{Math.round(weatherData.main.temp)}ºF</Text> : <Text style={styles.temp}>{Math.round((weatherData.main.temp - 32) * 5 / 9)}ºC</Text>}
                                <Text style={styles.weather}>{weatherData.weather[0].main}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (<></>)}
                </View>

                <Text style={styles.credit}>Weather Wizard developed by Arpan Neupane</Text>

            </View>
            </ScrollView>
        </ImageBackground>

    );
}

const styles = StyleSheet.create({

    container: {
        fontFamily: 'Montserrat'
    },

    main: {
        marginTop: 66,
        marginLeft: '10%',
        marginRight: '10%',
        width: '100%'
    },

    cityInput: {
        width: '80%',
        height: 54,
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0.8)',
        color: '#000',
        fontWeight: '400',
        borderRadius: 7,
        fontSize: 20
    },

    date: {
        marginTop: 41,
        fontSize: 20,
        marginBottom: 34,
        lineHeight: 24,
        color: '#fff'
    },

    city: {
        fontSize: 20,
        lineHeight: 24,
        marginBottom: 41,
        color: '#fff'
    },

    tempInfo: {
        width: '80%',
        height: 205,
        borderRadius: 21,
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 40
    },

    temp: {
        fontSize: 60
    },

    weather: {
        fontSize: 30
    },

    credit: {
        fontSize: 20,
        textAlign: 'center',
        color: '#fff',
        marginLeft: 10,
        marginRight: 10
    }

});

