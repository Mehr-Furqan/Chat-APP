import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '../../component/Colors';
import { Dimensions } from 'react-native';
import Button from '../../component/Button';
import MidleScrenText from '../../component/midleScrenText';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const StartMessaging = ({ navigation }) => {
    const log = () => {
        navigation.navigate('SignUpNo')
    }

    return (
        <SafeAreaView style={{ backgroundColor: Colors.MainBackground, flex: 1 }}>
            <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
            <Image style={styles.Img} source={require('../Img/StartMessaging.png')} />
            <MidleScrenText
                txt={'Connect easily with your family and friends over countries'}
                style={
                    {
                        marginTop: windowHeight * 0.071,
                        width: windowWidth * 0.78,

                    }}
            />
            <Text style={styles.termsPrivicy}>Terms & Privacy Policy</Text>


            <View
                style={{ marginTop: windowHeight * .0369 }}>
                <Button
                    txt={'Start Messaging'}
                    OnPress={log}
                    Loader={false}
                /></View>
        </SafeAreaView>
    )
}

export default StartMessaging;

const styles = StyleSheet.create({

    Img: {
        height: windowHeight * 0.18,
        width: windowWidth * 0.78,
        alignSelf: 'center',
        marginTop: windowHeight * 0.24,
    },

    termsPrivicy: {
        fontSize: 14,
        alignSelf: 'center',
        color: Colors.textBlack,
        marginTop: windowHeight * 0.15

    }
})