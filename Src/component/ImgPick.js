import { height, width, Modal, Pressable, Text, } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Image, StyleSheet, Dimensions, TouchableOpacity } from "react-native"
import { Colors } from "./Colors";
import { assets } from "./assets";
import * as ImagePicker from 'react-native-image-picker';
import TextInputView from "./TextInput";


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ImgPicker = (props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [clicked, setCliked] = useState(false);
    const [imageloaging, setImageloading] = useState(false);
    const [showimage, setshowimage] = useState('');

    useEffect(() => {
        props.getImg(showimage)
    }, [showimage])



    const ModelHandler = () => {
        setModalVisible(!modalVisible)
    }
    const opencamera = async () => {
        setCliked(true);
        setTimeout(() => {
            setImageloading(true);
            setModalVisible(false);
            ImagePicker.launchCamera({
                mediaType: 'photo',
                includeBase64: false,
                height: 400,
                width: 400,
                quality: 1,
            }).then(async response => {
                setModalVisible(false);
                setImageloading(false);
                if (!response.didCancel) {
                    setshowimage(response?.assets[0]);
                    // console.log('image', response?.assets[0]);
                }
                setCliked(false);
            });
        }, 1000);
    };
    const openGallery = async () => {
        setCliked(true);
        setTimeout(() => {
            setImageloading(true);
            setModalVisible(false);
            ImagePicker.launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
                height: 400,
                width: 400,
                quality: 1,
            }).then(async response => {
                setModalVisible(false);
                setImageloading(false);
                if (!response.didCancel) {
                    setshowimage(response?.assets[0]);
                    // console.log('image', response?.assets[0]);
                    // console.log('uri', response?.assets[0]?.uri);
                    // console.log('type', response?.assets[0]?.type);
                }
                setCliked(false);
            });
        }, 1000);
    };

    return (
        <View style={[styles.MainContainer, props.styles]} >
            <View style={styles.container}><Image style={styles.img} source={showimage != "" ? showimage : assets.Avt} /></View>

            {props.img ?
                <TouchableOpacity onPress={ModelHandler}><Image style={styles.Plus} source={require('../Auth/Icon/Plus.png')} /></TouchableOpacity>

                : null}



            <Modal animationType="slide" transparent={true} visible={modalVisible}>
                <Pressable
                    onPress={() => setModalVisible(false)}
                    style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, { fontWeight: 'bold' }]}>
                            Upload photo
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                
                            }}>
                            <TouchableOpacity
                                disabled={clicked}
                                style={styles.gallerybtn}
                                onPress={() => opencamera()}>
                                <Image source={assets.camera} style={styles.galleryImage} />
                                <Text style={styles.galleryText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                disabled={clicked}
                                style={styles.gallerybtn}
                                onPress={() => openGallery()}>
                                <Image source={assets.gallery} style={styles.galleryImage} />
                                <Text style={styles.galleryText}>Gallery</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}
export default ImgPicker;
const styles = StyleSheet.create({
    MainContainer: {
        height: windowHeight * 0.123,
        width: windowHeight * 0.123,
        alignSelf: 'center',
        marginTop: windowHeight * 0.073,
    },
    container: {
        height: windowHeight * 0.123,
        width: windowHeight * 0.123,
        borderRadius: windowHeight * 0.123,
        backgroundColor: Colors.TextInputBackground,
        justifyContent: 'center',

    },
    img: {
        resizeMode: 'contain',

        alignSelf: 'center',
        // height: 100,
        // width: 100,
        borderRadius: 100,
        // width: undefined,
        height: undefined,
        aspectRatio: 1,
        width: '100%',
        // height: '100%',


    },
    Plus: {
        height: 20,
        width: 20,
        position: 'absolute',
        bottom: 0,
        right: 8,
    },
    modalView: {
        backgroundColor: Colors.TextInputBackground,
        borderRadius: 20,
        paddingHorizontal: '20%',
        paddingVertical: 40,
        borderColor: Colors.buttonBackground,
        borderWidth: 1,
        alignItems: 'center',
        shadowColor: Colors.textBlack,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // marginTop: '35%',
        marginHorizontal: '5%',
        justifyContent: 'space-between',
        // flexDirection:'row'
        marginTop:'55%'
    },
    modalText: {
        color: Colors.textBlack,
        fontSize: 22,
        textAlign: 'center',
    },
    gallerybtn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '40%',
        marginBottom: 20,
        marginTop: 30,
        fontWeight: '600',
    },
    galleryImage: {
        height: 35,
        width: 35,
        resizeMode: 'contain',
        tintColor: 'black'
    },
    galleryText: {
        fontSize: 16,
        padding: 5,
        color: Colors.textBlack,
        fontWeight: '600',
        textAlign: 'center',

    },
    centeredView: {
        // backgroundColor: 'red'
    }
})