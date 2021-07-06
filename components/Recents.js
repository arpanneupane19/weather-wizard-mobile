import React, { useState } from 'react';
import {
    StyleSheet,
    ImageBackground,
    ScrollView,
    Text,
    View,
    RefreshControl,
    Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';


let json = require('./recents.json')

export default function Recents({ navigation }) {

    const [refreshing, setRefreshing] = useState(false);
    const [weatherData, setWeatherData] = useState([{}])

    const apiKey = "API KEY";

    const onRefresh = () => {
        setRefreshing(true);
        json.recents = []
    }

    const showAlert = (city) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=${apiKey}`).then(
            response => response.json()
        ).then(
            data => {
                setWeatherData(data)
            }
        )
        if (typeof weatherData.main !== 'undefined') {
            Alert.alert(
                `${weatherData.name}, ${weatherData.sys.country}`,
                `${Math.round(weatherData.main.temp)}ºF / ${Math.round((weatherData.main.temp - 32) * 5 / 9)}ºC`
            )
        }

    }



    return (
        <SafeAreaView>
            <StatusBar barStyle='light-content' />
            <ImageBackground
                source={require('../assets/warm-bg.jpg')}
                style={{ width: '100%', height: '100%' }}
            >

                <ScrollView style={styles.main}
                    content={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refresh={refreshing}
                            onRefresh={onRefresh}
                        />
                    }>

                    <View style={styles.recent}>
                        <Text style={styles.city}>Your recent searches will be here.</Text>
                    </View>
                    {json.recents.map((item, i) => (
                        <View style={styles.recent} key={i}>
                            <TouchableOpacity onPress={() => showAlert(item.city)}>
                                <Text style={styles.city}>{item.city}</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </ImageBackground >
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    main: {
        paddingTop: '10%',
        flex: 1,
        width: '100%',
    },

    recent: {
        padding: 15,
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: '85%',
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    city: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center'
    },

    goBack: {
        padding: 15,
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 10,
        marginBottom: 10,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    backdrop: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }
})
