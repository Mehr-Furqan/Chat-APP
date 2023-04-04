import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar, Image, TextInput, TouchableOpacity } from 'react-native'
import { Colors } from '../component/Colors'
import { assets } from '../component/assets'
import Header from '../component/Header'
import React, { useState } from 'react'



const Contacts = ({ navigation }) => {
    const [search, setsearch] = useState()
    const [members, setmembers] = useState([
        {
            id: 1,
            img: assets.Profile,
            online: true,
            lastSceen: '1',
            name: 'Do not  Accept Destination'

        },
        {
            id: 2,
            img: assets.Profile,
            online: false,
            lastSceen: '1',
            name: 'Do not  Accept Destination'

        },
        {
            id: 3,
            img: assets.Profile,
            online: true,
            lastSceen: '3',
            name: 'Do not  Accept Destination'

        },
    ])
    const GoBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.MainBackground }}>
            <StatusBar backgroundColor={Colors.Statusbar} barStyle={'dark-content'} />
            <Header
                txt={'Contacts'}
                OnPress={GoBack} />
            <View style={[Styles.Search, { paddingVertical: Platform.OS === 'ios' ? '2.5%' : '0  %' }]}>
                <Image style={Styles.SearchIcon} source={assets.search} />
                <TextInput style={Styles.textInputSearch}
                    placeholder='Search'
                    placeholderTextColor={Colors.textBlack}
                    value={search}
                    onChangeText={(e) => setsearch(e)}


                />

            </View>
            <View>
                <TouchableOpacity style={Styles.LastTouchAble}>
                    <Image style={Styles.LastIcon} source={assets.InviteFriends} />
                    <Text style={Styles.lastText}>Invite friends</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                paddingVertical: '4%',
                paddingLeft: '5%',
                backgroundColor: Colors.TextInputBackground
            }}>
                <Text style={Styles.Contacts}>Contacts</Text>
            </View>
            <View>
                <FlatList
                    data={members}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: '5%', paddingVertical: '4%', borderBottomWidth: 1, borderBottomColor: Colors.ContactsSearchInputBackground }}>
                                <Image style={Styles.img} source={item.img} />
                                <Text style={Styles.Name}>{item.name}</Text>
                                {item.online ?
                                    <View
                                        style={Styles.Online}
                                    ><Text style={Styles.OnlineText}>Online</Text></View> : <Text style={Styles.lastSceen}>{item.lastSceen} houre ago</Text>
                                }
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

        </SafeAreaView>
    )
}

export default Contacts

const Styles = StyleSheet.create({
    Search: {
        flexDirection: 'row',
        marginHorizontal: '5%',
        backgroundColor: Colors.ContactsSearchInputBackground,

        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: '5%',
        marginTop: '10%',
        marginBottom: '5%',
        borderColor: Colors.lighGrayBorder,
        borderWidth: 1,





    },
    SearchIcon: {
        height: 20,
        width: 20,
        tintColor: Colors.textBlack

    },
    textInputSearch: {

        fontSize: 14,
        fontWeight: '500',
        color: Colors.textBlack,
        marginHorizontal: '5%',
        flex: 1


    },
    LastIcon: {
        height: 50,
        width: 50,
        resizeMode: 'contain'

    },
    lastText: {
        fontSize: 20,
        fontWeight: '500',
        paddingLeft: '4%',
        color: Colors.textBlack
    },
    LastTouchAble: {
        flexDirection: 'row', paddingHorizontal: '5%', paddingVertical: '4%', borderBottomColor: Colors.lighGrayBorder, alignItems: 'center'
    },
    Contacts: {
        fontSize: 14,
        fontWeight: '700'
    },
    img: {
        height: 50,
        width: 50,
        borderRadius: 100
    },
    Online: {
        borderColor: Colors.greenBorder,
        borderRadius: 10,
        borderWidth: 1,
        right: 15,
        position: 'absolute',
        paddingVertical: '2%',
        height: '43%',
        width: '15%'

    },
    OnlineText: {
        fontSize: 12,
        fontWeight: '400',


        textAlign: 'center',
        color: Colors.textBlack
    },
    lastSceen: {
        fontSize: 12,
        fontWeight: '400',
        padding: '.8%',
        color: Colors.textBlack,
        right: 15,
        position: 'absolute'

    },
    Name: {
        fontSize: 14,
        fontWeight: '700',
        paddingLeft: '3%',
        color: Colors.textBlack
    }
})