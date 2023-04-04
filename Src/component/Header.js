import React from "react";
import { View, Image, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { Colors } from "./Colors";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Header = ({ txt, OnPress }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={OnPress}><Image style={styles.img} source={require('../Auth/Icon/BackIcon.png')} /></TouchableOpacity>
            {txt ?
                <Text style={styles.txt}>{txt}</Text> : null}
        </View>
    )
}
export default Header;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingHorizontal: windowWidth * 0.043,
        alignContent: 'center'
    },
    img: {
        height: 20,
        width: 12
    },
    txt: {
        alignSelf: 'center',
        color: Colors.textBlack,
        fontSize: 18,
        fontWeight: '600',
        paddingLeft: windowWidth * 0.023
    }
})
