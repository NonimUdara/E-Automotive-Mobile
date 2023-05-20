import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useDispatch } from "react-redux";

import { addToCart } from '../Store/actions/cart';

const GarageDetail = (props) => {
    const dispatch = useDispatch();

    let imageUri = 'https://bootdey.com/img/Content/avatar/avatar6.png';

    if (props.garageDetail.image1) {
        imageUri = `data:image/jpg;base64,${props.garageDetail.image1}`;
    }


    const handleLocationPress = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${props.garageDetail.latitude},${props.garageDetail.longitude}`;
        Linking.openURL(url);
    }

    const handlePhoneCall = () => {
        Linking.openURL(`tel:${props.garageDetail.number}`);
    }


    return (
        <View style={{ marginTop: 50 }}>
            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <View style={{display: 'flex'}}>
                    <Text style={{ marginTop: 0, width :130, marginRight:20, fontWeight:'bold' }}>
                        {props.garageDetail.name}
                    </Text>
                    <Text style={{ marginTop: 0, width :130 }}>
                        {props.garageDetail.town}
                    </Text>
                    <Text style={{ marginTop: 0, width :130 }}>
                        {props.garageDetail.address}
                    </Text>
                    <Text>
                        {props.garageDetail.number}
                    </Text>
                    <Image
                        style={styles.avatar}
                        source={{ uri: imageUri }}
                    />
                </View>
                {/* <TouchableOpacity style={styles.AddButton} onPress={handleLocationPress}>
                    <Text style={{fontSize: 12, color: 'white'}}>
                        Get
                    </Text>
                    <Text style={{fontSize: 12, color: 'white'}}>
                        Direction
                    </Text>
                </TouchableOpacity> */}
                <View style={styles.viewpm}>
                    <TouchableOpacity style={styles.PlusButton} onPress={handlePhoneCall}>
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Call
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.MinusButton} onPress={handleLocationPress}>
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Direction
                        </Text>
                    </TouchableOpacity>
                </View> 
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 110,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute'
    },
    AddButton: {
        width: '20%',
        color: '#fff',
        height: 45,
        width: 70,
        backgroundColor: '#41B93E',
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 290,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    PlusButton: {
        color: '#fff',
        height: 30,
        width: 55,
        backgroundColor: '#41B93E',
        borderRadius: 5,
        marginTop: -50,
        marginBottom: 0,
        marginLeft: 330,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    MinusButton: {
        color: '#fff',
        height: 30,
        width: 60,
        backgroundColor: '#41B93E',
        borderRadius: 5,
        marginTop: -50,
        marginLeft: 260,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    viewpm: {
        marginBottom: 0,
        display:'flex'
    }
})

export default GarageDetail;