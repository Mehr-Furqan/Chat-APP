import { StyleSheet, Text, View, ScrollView, Image, StatusBar, Platform, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../component/Colors'
import { assets } from '../component/assets'

import ToggleSwitch from 'toggle-switch-react-native'



const UserProfile = () => {
    const [members, setmembers] = useState([
        {
            id: 1,
            Name: 'Daniel Atkins',
            img: assets.Profile,
            online: 'true'

        },
        {
            id: 2,
            Name: 'Daniel Atkins',
            img: assets.Profile,
            online: 'false'

        },
        {
            id: 3,
            Name: 'Daniel Atkins',
            img: assets.Profile,
            online: 'false'

        }

    ])
    const [admember, setaddmember] = useState([
        {
            id: 1,
            img: assets.a
        },
        {
            id: 2,
            img: assets.b
        },
        {
            id: 3,
            img: assets.c
        },
        {
            id: 4,
            img: assets.d
        }
    ])
    return (
        <SafeAreaView >
            <ScrollView style={{ marginTop: Platform.OS === 'ios' ? '10%' : null }}>
                <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
                <View style={styles.imgProfileContainer}>
                    <Image
                        source={assets.Profile} style={styles.imgProfile} />
                    <Image style={styles.OnlineDot} source={assets.Bluedot} />
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', marginTop: '3%', paddingHorizontal: '5%' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.Name}>Sandra Dorsett</Text>

                    </View>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.edit} source={assets.edit} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: '5%', justifyContent: 'space-between', marginTop: '10%', paddingVertical: '5%' }}>

                    <Image style={styles.ImgNotify} source={assets.GreenNotify} />
                    <Text style={styles.notifyText}>Notifications</Text>
                    <View></View>
                    <View style={styles.Toggle}>
                        <ToggleSwitch
                            isOn={false}
                            onColor="green"
                            offColor="red"


                            size="medium"
                            onToggle={isOn => console.log("changed to : ", isOn)}
                        />
                    </View>
                </View>



                <View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: '5%', paddingTop: '4%', justifyContent: 'space-between' }}>
                        <Text style={styles.MediaText}>Media, Doc , Links</Text>
                        <TouchableOpacity><Text style={styles.SeeAll}>See all</Text></TouchableOpacity>
                    </View>
                    <FlatList
                        horizontal={true}
                        data={admember}
                        style={{ paddingHorizontal: '5%', paddingVertical: '6%' }}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ paddingHorizontal: '1%' }}>
                                    <Image style={styles.MediaImg} source={item.img} />
                                </View>
                            )
                        }} />
                </View>
                <View style={{ marginBottom: '50%' }}>
                    <TouchableOpacity style={[styles.LastTouchAble, { borderBottomWidth: 1, }]}>
                        <Image style={styles.LastIcon} source={assets.blockGroup} />
                        <Text style={styles.lastText}>Block User</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.LastTouchAble}>
                        <Image style={styles.LastIcon} source={assets.ReportGroup} />
                        <Text style={styles.lastText}> Report User</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default UserProfile

const styles = StyleSheet.create({
    imgProfileContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '5%'
    },
    imgProfile: {
        borderRadius: 100,
        height: 80,
        width: 80,
    },
    OnlineDot: {
        height: 20,
        width: 20,
        tintColor: Colors.tintGreen,
        position: 'absolute',
        top: 0,
        right: 0,
        borderColor: Colors.MainBackground,
        borderWidth: 2,
        borderRadius: 100,
    },
    nameContainer: {
        flex: 3,

        // marginLeft: '15%'
        // backgroundColor: 'red'

    },
    Name: {
        fontSize: 16,
        fontWeight: '700',
        color: Colors.textBlack,
        alignSelf: 'center',
        marginBottom: '2%'


    },
    GroupParticipent: {
        fontSize: 11,
        fontWeight: '500',
        color: Colors.TextGray,
        alignSelf: 'center'

    },
    edit: {
        alignSelf: 'flex-end',
        tintColor: Colors.textBlack,
        height: 20,
        width: 20,

    },
    ImgNotify: {
        height: 20,
        width: 20,
    },
    notifyText: {
        paddingLeft: '2%',
        fontWeight: '400',
        color: Colors.textBlack,
        textAlign: 'center',
        position: 'absolute',
        left: '15%',
        alignSelf: 'center'


    },
    Toggle: {

    },
    GroupMembersContainer: {
        backgroundColor: Colors.TextInputBackground,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },
    GroupMembers: {
        fontSize: 14,
        fontWeight: '700'
    },
    SeeAll: {
        fontSize: 11,
        fontWeight: '400',
    },
    FlatListImg:
    {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
    },
    FlatListName: {
        // backgroundColor: 'red',
        fontSize: 15,
        fontWeight: '500',
        paddingLeft: '4%'

    },
    more: {
        right: 0,
        height: 30,
        width: 30,
        tintColor: Colors.tintBlack,



    },
    AddNewwIcon: {
        height: 50,
        width: 50,

    },
    AddNewText: {
        fontSize: 15,
        fontWeight: '700',
        paddingLeft: '4%'
    },
    MediaText: {
        fontSize: 14,
        fontWeight: '700'
    },
    SeeAll: {
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: Colors.textBlack,

    },
    MediaImg: {
        height: 87,
        width: 81,
        borderRadius: 4
    },
    LastIcon: {
        height: 25,
        width: 20,
        resizeMode: 'contain'

    },
    lastText: {
        fontSize: 12,
        fontWeight: '400',
        paddingLeft: '4%'
    },
    LastTouchAble: {
        flexDirection: 'row', paddingHorizontal: '5%', paddingVertical: '4%', borderBottomColor: Colors.lighGrayBorder, borderTopColor: Colors.lighGrayBorder, borderTopWidth: 1, alignItems: 'center'
    }
})