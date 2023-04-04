import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { Colors } from './Colors';
const MidleScrenText = (props) => {
    return (

        <Text style={[props.style, styles.txt]}>{props.txt}</Text>


    )
}

export default MidleScrenText

const styles = StyleSheet.create({
    txt: {
        fontSize: 24,
        alignSelf: 'center',


        textAlign: 'center',
        color: Colors.textBlack,
        fontWeight: '700',
        fontFamily: 'Mulish Regular'


    },
})