import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Path } from './Path';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const screenOptionStyle = {
    headerShown: false,
};

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptionStyle}
            initialRouteName={'StartMessaging'}
        >
            <Stack.Screen name="StartMessaging" component={Path.StartMessaging} />
            <Stack.Screen name="SignUpNo" component={Path.SignUpNo} />
            <Stack.Screen name="SignupProfile" component={Path.SignupProfile} />
            <Stack.Screen name="Otp" component={Path.Otp} />
            <Stack.Screen name="Login" component={Path.Login} />
            <Stack.Screen name="ForgotPassword" component={Path.ForgotPassword} />
            <Stack.Screen name="UpdatePassword" component={Path.UpdatePassword} />
            <Stack.Screen name="FOtp" component={Path.FOtp} />







        </Stack.Navigator>
    )
}

export default AuthStack

const styles = StyleSheet.create({})