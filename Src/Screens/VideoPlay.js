import { StyleSheet, Text, View, SafeAreaView, Dimensions, ActivityIndicator, TouchableOpacity, Image } from 'react-native'


import React, { useState } from 'react';
import { useRef } from 'react';
import Video from 'react-native-video';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { assets } from '../component/assets';
import { Colors } from '../component/Colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const VideoPlay = ({ route, navigation }) => {

    const [U, SetU] = useState()
    const [videoloading, setVideoloading] = useState(false);
    const videoPlayer = useRef();
    const onLoadEnd = async () => {
        console.log("onLoadEnd");
        setVideoloading(false);
    };
    const onLoadStart = async () => {
        console.log("onLoadEnd");

        console.log("onLoadStart");
        setVideoloading(true);
    };
    console.log('route?', route?.params?.item);
    // const SRC = route?.params?.item
    const GetMessagesRedux = useSelector(state => state.OfflineMedia);

    const SRC = route?.params

    useEffect(() => {

        // console.log(GetMessagesRedux, "offlineDataRedux")
        // getUri()
    }, [GetMessagesRedux])

    const getUri = () => {


        console.log(route?.params?.item.thumbnail, 'kk');
        if (GetMessagesRedux.some(GetMessagesRedux => GetMessagesRedux.fileName === SRC.item.attatchment_name)) {

            for (let index = 0; index < GetMessagesRedux?.length; index++) {


                if (GetMessagesRedux[index].fileName === SRC.item.attatchment_name) {
                    console.log(SRC.item.attatchment_name, GetMessagesRedux[index].fileName, GetMessagesRedux[index]?.uri);
                    SetU(GetMessagesRedux[index]?.uri)
                }

            }
        } else {
            console.log(SRC.item.filename);
            SetU(SRC.item.filename)
        }
        // for (let index = 0; index < GetMessagesRedux?.length; index++) {


        //     if (GetMessagesRedux[index].fileName === SRC.item.attatchment_name) {
        //         console.log(SRC.item.attatchment_name, GetMessagesRedux[index].fileName, GetMessagesRedux[index]?.uri);
        //         SetU(GetMessagesRedux[index]?.uri)
        //     }


        // }


    }
    console.log(
        "videoloading", videoloading
    );
    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'black' }}>
                {route?.params?.item.media_type != "PICTURE" ?
                    <Video
                        source={{
                            uri: SRC.item.attatchment
                        }}
                        fullscreen={true}
                        volume={1.0}
                        pictureInPicture={true}
                        controls={true}
                        onReadyForDisplay={onLoadEnd}
                        onEnd={onLoadEnd}
                        onLoad={onLoadStart}
                        onLoadStart={onLoadStart}
                        onLoadEnd={onLoadEnd}

                        ref={ref => (videoPlayer.current = ref)}
                        resizeMode={'contain'}
                        disableVolume
                        onBuffer={onLoadStart}
                        // onProgress={onLoadStart}
                        ignoreSilentSwitch={'ignore'}


                        poster={SRC.item.thumbnail}

                        style={{ height: windowHeight * 0.95, width: windowWidth }}

                    /> :
                    <FastImage
                        style={{ height: '100%', width: '100%' }}
                        source={{
                            uri: SRC.item.attatchment,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />

                }
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', top: 10, right: '2%', zIndex: 1 }}><Image source={assets.xmark} style={{ height: 30, width: 30, resizeMode: "contain", tintColor: Colors.tintGreen }} /></TouchableOpacity>

            </View>

            {videoloading ? (
                <ActivityIndicator
                    size={'large'}
                    color="red"
                    style={{ position: 'absolute', top: '50%', left: '50%' }}></ActivityIndicator>
            ) : (
                <></>
            )}
        </SafeAreaView>
    )
}

export default VideoPlay

const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
})