import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useSelector } from "react-redux";

import Part from './Part';
import { PRODUCT_TYPES } from '../data/dummy-data';
import { ScrollView } from 'react-native-gesture-handler';

const UserDashboard = ({ navigation }) => {
    const products = useSelector((state) => state.products);
    const vanParts = products.availableProducts.filter((vanpart) => vanpart.type === PRODUCT_TYPES.van);

    const [searchQuery, setSearchQuery] = useState('');

    const navigate = () => {
        navigation.navigate('AddVanPart');
    }

    const filteredVanParts = vanParts.filter((vanPart) =>
        vanPart.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vanPart.price.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vanPart.condition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vanPart.model.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query) => {
        setSearchQuery(query);
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
                    Van Parts
                </Text>
                <View style={styles.bodyview}>
                    <TextInput
                        placeholder={"Search"}
                        placeholderTextColor={"#a1a1a1"}
                        style={styles.TextInput}
                        onChangeText={handleSearch}
                        value={searchQuery}
                    />
                    <TouchableOpacity style={styles.AddButton} onPress={navigate}>
                        <Text style={{ color: 'white' }}>
                            Add Part
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView >
                    <Text style={{ marginTop: -75 }}></Text>
                    <Text>

                    </Text>
                    {/* {VanParts.map((vanpart) => <Part part={vanpart} />)} */}
                    {filteredVanParts.map((vanPart, index) => <Part key={index} part={vanPart} />)}

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