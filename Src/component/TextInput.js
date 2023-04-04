import { StyleSheet, Text, View, TextInput, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from './Colors';
import { assets } from './assets';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const TextInputView = (props) => {
    const [pwdVisible, setpwdVisible] = useState(true)
    const PwdShowHandler = () => {
        setpwdVisible(!pwdVisible)
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInpt}
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeHolder}
                secureTextEntry={props.pwd ? pwdVisible : null}
                placeholderTextColor={Colors.TextGray}
            />
            {
                props.pwd ?
                    <TouchableOpacity onPress={PwdShowHandler} style={{ alignItems: "center", justifyContent: 'center' }}>
                        <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                            <Image style={styles.img} source={assets.eye} />
                        </View>
                    </TouchableOpacity> : null}
        </View>
    )
}

export default TextInputView

const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: windowWidth * 0.872,
        alignSelf: 'center',
        alignContent: 'center',
        height: windowHeight * 0.05,
        backgroundColor: Colors.TextInputBackground,
        width: windowWidth * 0.872,
        marginVertical: '2%'
    }

    ,
    textInpt: {

        paddingLeft: '4%',
        alignSelf: 'center',
        fontSize: 14, fontWeight: '600',
        color: Colors.textBlack,



    },
    img: {
        height: 15,
        width: 20,
        paddingRight: '10%'
        // right: 25,
        // top: 13,
        // alignSelf: 'center',


    }
})