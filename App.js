import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Weather from './components/Weather'
import Recents from './components/Recents';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true, headerTransparent: true }}>
                <Stack.Screen name='Home' component={Weather} options={{ headerTintColor: "#fff" }} />
                <Stack.Screen name='Recents' component={Recents} options={{ headerTintColor: "#fff" }} />
            </Stack.Navigator >
        </NavigationContainer >

    );
}

