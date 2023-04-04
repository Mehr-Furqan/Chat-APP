import { StyleSheet, Text, TouchableOpacity, Dimensions ,ActivityIndicator} from 'react-native'
import React from 'react'
import { Colors } from './Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Button = (props) => {
    return (
        <TouchableOpacity
            onPress={props.OnPress}
            style={[styles.container, props.style]}>
            {props.Loader?  <ActivityIndicator animating={props.Loader}  size="large" color="white" />: <Text style={styles.btnText}>{props.txt}</Text>
           }
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        height: windowHeight * 0.064,
        width: windowWidth * 0.872,
        backgroundColor: Colors.buttonBackground,
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    btnText: {
        fontSize: 16,
        color: Colors.textBlack,
        fontWeight: '600',
        textAlign: 'center',

    }
})