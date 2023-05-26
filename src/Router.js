import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import React, { useState, useEffect, useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomePage from './Pages/HomePage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from './Pages/Profile';
import MyDresses from './Pages/AddDress';
import LoginPage from './Pages/LoginPage';
import CreateCombin from './Pages/CreateCombin';
import RegisterScreen from './Pages/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './Context/AuthContext';
import AddDress from './Pages/AddDress';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();






const ProfileStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name='ProfilePage' component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name='Kıyafet Ekle' component={AddDress} />
        </Stack.Navigator>
    )

}
const HomeStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomePages" component={HomePage} options={{ headerShown: false }} />
            <Stack.Screen name="KombinOluştur" component={CreateCombin} />
        </Stack.Navigator>
    )
}

const Router = () => {

    const { isLoading, userToken } = useContext(AuthContext)

    if (isLoading) {
        return (
            <View>
                <ActivityIndicator size={"large"} style={{justifyContent:"center",alignItems:"center"}} />
            </View>
        )

    }


    return (
        <NavigationContainer>
            {userToken !== null ?
                (<Drawer.Navigator>
                    <Drawer.Screen name="HomePage" component={HomeStack} />
                    <Drawer.Screen name="Profile" component={ProfileStack} />
                </Drawer.Navigator>) :
                (
                    <Stack.Navigator>
                        <Stack.Screen name='Login Page' component={LoginPage} />
                        <Stack.Screen name='Register' component={RegisterScreen} />
                    </Stack.Navigator>
                )
            }
        </NavigationContainer>
    )
}

export default Router

const styles = StyleSheet.create({})