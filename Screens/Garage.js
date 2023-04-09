import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, TextInput } from 'react-native';

//const UserDashboard = ({ navigation }) => {
//
const LocationForm = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const handleLocationPress = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        Linking.openURL(url);
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.BottomView}>
                <Text style={styles.Heading}>
                    E-Automotives
                </Text>
                <Text numberOfLines={1} style={styles.line}>
                    ___________________________________

                </Text>
                <Text style={styles.Heading2}>
                    Garages
                </Text>
                <View>
                    <TextInput
                        value={latitude}
                        onChangeText={setLatitude}
                        placeholder="Latitude"
                        keyboardType="numeric"
                    />
                    <TextInput
                        value={longitude}
                        onChangeText={setLongitude}
                        placeholder="Longitude"
                        keyboardType="numeric"
                    />
                    <TouchableOpacity onPress={handleLocationPress}>
                        <Text>Click</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BottomView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    Heading: {
        color: '#41B93E',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    Heading2: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    line: {
        textAlign: 'center',
        marginTop: -10,
        color: '#000',
        marginBottom: 10
    }

})

export default LocationForm;