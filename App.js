import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Weather from './components/Weather'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Favorites from './components/Favorites';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" activeColor="#45b6fe" inactiveColor="#bebdb8" barStyle={{ backgroundColor: '#fff' }}>
                <Tab.Screen name="Home" component={Weather} options={{tabBarLabel: 'Home', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="weather-cloudy" color={color} size={20}/>),}}/>
                <Tab.Screen name="Favorites" component={Favorites} options={{tabBarLabel: 'Favorites', tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="thumb-up-outline" color={color} size={20}/>),}}/>
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}

