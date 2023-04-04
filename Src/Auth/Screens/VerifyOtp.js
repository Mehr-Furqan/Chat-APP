import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { Colors } from '../../component/Colors';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const VerifyOtp = ({ otp }) => {
    const CELL_COUNT = 4;


    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    })
    useEffect(() => {
        console.log('value', value, value.length);
        otp(value)
    }, [value.length === 4])


    return (
        <View>
            <CodeField

                // ref={ref}
                autoFocus
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}

                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                        onLayout={getCellOnLayoutHandler(index)}
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}>
                        <Text style={styles.cellText}>
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

export default VerifyOtp

const styles = StyleSheet.create({
    codeFiledRoot: {
        marginTop: windowHeight * 0.06,
        width: windowWidth * 0.664,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    cellRoot: {

        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        // borderBottomWidth: 1
        backgroundColor: Colors.TextInputBackground,
        borderRadius: 20


    },
    cellText: {
        color: '#000',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
    },
    focusCell: {
        // marginTop: '20%',
        borderBottomColor: '#007AFF',
        // borderBottomWidth: 2,
    },
})