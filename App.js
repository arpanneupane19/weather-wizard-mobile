import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, ImageBackground, ScrollView, Text, View, TextInput, TouchableOpacity, Touchable } from 'react-native';


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
                        <TouchableOpacity style={styles.weather} onPress={() => unit ? setUnit(false) : setUnit(true)} >
                            <Text style={styles.city}>{weatherData.name}, {weatherData.sys.country}</Text>
                            {unit ? <Text style={styles.temp}>{Math.round(weatherData.main.temp)}ºF</Text> : <Text style={styles.temp}>{Math.round((weatherData.main.temp - 32) * 5 / 9)}ºC</Text>}
                            <Text style={styles.outside}>{weatherData.weather[0].main}</Text>
                        </TouchableOpacity>
                    ) : (<></>)}

                    <Text style={styles.date}>{dateBuilder(new Date())}</Text>

                    <View style={styles.creditBox}>
                        <Text style={styles.credit}>Weather Wizard developed by <Text style={styles.name}>Arpan Neupane</Text></Text>
                    </View>

                </View>

                


            </View>
            </ScrollView>


    );
}


const styles = StyleSheet.create({

    container: {
        fontFamily: 'Helvetica Neue',
        backgroundColor: '#f2f2f2',
    },

    main: {
        marginTop: 76,
        width: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    cityInput: {
        width: '80%',
        height: 54,
        padding: 15,
        backgroundColor: '#fff',
        color: '#000',
        fontWeight: '400',
        borderRadius: 7,
        fontSize: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        
        elevation: 7,
    },

    weather: {
        width: 231,
        height: 231,
        marginTop: 150,
        padding: 45,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        borderRadius: 25,
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'

    },

    city: {
        fontWeight: '500',
        fontSize: 20,
        fontStyle: 'normal',
        lineHeight: 24,
        textAlign: 'center'
    },

    temp: {
        fontStyle: 'normal',
        fontSize: 40,
        color: "#c60000",
        textAlign: 'center',
        marginTop: 16,
        lineHeight: 48
    },

    outside: {
        fontStyle: 'normal',
        fontSize: 23,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 27
    },

    date: {
        fontSize: 23,
        marginTop: 40,
        textAlign: 'center'
    },

    creditBox: {
        alignItems: 'center',
        height: 148,
        width: 319,
        backgroundColor: '#FFF',
        borderRadius: 9,
        marginTop: 100,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.48,
        shadowRadius: 11.95,
        elevation: 18,
        borderRadius: 9,
        backgroundColor: "#fff",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },

    credit: {
        textAlign: 'center',
        fontSize: 23,
    },

    name: {
        color: '#0085ff'
    }


});

