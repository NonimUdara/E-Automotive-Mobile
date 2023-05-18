import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';

import api from "../UrlData";
import Garage from '../models/garage';
import { addGarages } from '../Store/actions/garages';
import GarageDetail from './GarageDetail';

const UserDashboard = ({ navigation }) => {
    const dispatch = useDispatch();
    const availableGarages = useSelector((state) => state.garages.availableGarages);

    const navigate = () => {
        navigation.navigate('SendGarage');
    }

    useEffect(() => {
        const url = api.baseUrl + "/garages";

        axios.get(url).then(res => {
            //console.log("res: ", Object.keys(res.data.existingGarages[0]));
            if (res.data.success) {
                const GarageArray = [];
                res?.data?.existingGarages.forEach(element => {
                    if (element.access === 'True') {
                        GarageArray.push(new Garage(
                            element._id,
                            element.image1,
                            element.name,
                            element.town,
                            element.address,
                            element.number,
                            element.latitude,
                            element.longitude,
                            element.email,
                        ))
                    }
                });
                dispatch(addGarages(GarageArray))
            }
        }).catch(err => {
            console.log("err: ", err);
        });
    }, []);

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
                <View style={styles.bodyview}>
                    <TextInput
                        placeholder={"Search"}
                        placeholderTextColor={"#a1a1a1"}
                        style={styles.TextInput}
                    />
                    <TouchableOpacity style={styles.AddButton} onPress={navigate}>
                        <Text style={{ color: 'white' }}>
                            Add Garage
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    <Text style={{ marginTop: -75 }}></Text>
                    <Text>

                    </Text>
                    {availableGarages.map((garage, index) => <GarageDetail key={index} garageDetail={garage} />)}
                    <Text style={{ marginBottom: 40 }}></Text>
                </ScrollView>

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
    },
    bodyview: {
        height: 25,
        flexDirection: 'row',
        marginBottom: 50,
        marginLeft: 0,
    },
    TextInput: {
        width: '70%',
        borderWidth: 1,
        borderColor: '#F3F3F3',
        height: 40,
        borderWidth: 20,
        borderRadius: 10,
        paddingLeft: 10,
        marginLeft: 10,
        marginTop: 20,
        color: '#000',
        backgroundColor: 'white'
    },
    AddButton: {
        width: '21%',
        color: '#fff',
        height: 40,
        backgroundColor: '#41B93E',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

})

export default UserDashboard;