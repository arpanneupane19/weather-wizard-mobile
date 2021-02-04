import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Weather from './components/Weather'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Favorites from './components/Favorites'

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" tabBarOptions={{activeTintColor: '#45b6fe',}}>
                <Tab.Screen name="Home" component={Weather} options={{tabBarLabel: 'Home', tabBarIcon: () => (<MaterialCommunityIcons name='home' color='#45b6fe' size={30}/>)}}/>
                <Tab.Screen name="Favorites" component={Favorites} options={{tabBarLabel: 'Favorites', tabBarIcon: () => (<MaterialCommunityIcons name='thumb' color='#45b6fe' size={30}/>)}}/>
            </Tab.Navigator>
        </NavigationContainer>
        
    );
}

