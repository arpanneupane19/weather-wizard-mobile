import React from 'react'
import { StyleSheet, ImageBackground, ScrollView, Text, View, Button } from 'react-native';
import favorites from './favorites.json'


export default function Favorites() {  

    return (
        <ImageBackground source={require('../assets/warm-bg.jpg')} style={{ width: '100%', height: '105%'}}>
                <View style={styles.container}>
                    <View style={styles.main}>
                        <Text style={styles.header}>Favorites</Text>
                                <ScrollView>
                                    {(favorites.cities != '') ? (
                                        <>
                                            {favorites.cities.map(cities => {
                                                return(
                                                    <View style={styles.favorite}>
                                                        <Text style={styles.city} key={cities}>{cities.city}</Text>
                                                        <Button styles={styles.close} title="&times;" onPress={()=> console.log('deleted')}/>
                                                    </View>
                                                )
                                            })}
                                        </>        
                                    ): (<Text style={styles.city}>You don't have any favorites.</Text>)}
                                </ScrollView>
                    </View>
                </View>
            
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    main: {
        marginTop: 66,
        flex: 1,
        justifyContent: 'center',
        width: '100%'
    },

    header: {
        color: '#fff',
        fontSize: 32,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: 40
    },

    favorite: {
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
        flexDirection: 'row'
    },

    city: {
        fontSize: 23,
        color:'#fff',
        textAlign: 'center'
    },
    close: {
        color: "#fff"
    }
})