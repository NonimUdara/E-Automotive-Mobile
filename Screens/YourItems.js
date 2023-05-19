import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from "react-redux";

import YourItem from './YourItem';
import { ScrollView } from 'react-native-gesture-handler';

const YourItems = () => {
    const userId = useSelector((state) => state.user.userId);
    const products = useSelector((state) => state.products);
    const yourParts = products.availableProducts.filter((part) => part.ownerId === userId);

    console.log("yourParts.length", yourParts.length);

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
                    Your Parts
                </Text>
                {yourParts.length > 0 ? (<ScrollView >
                    <Text style={{ marginTop: -45 }}></Text>
                    {yourParts.map((part, index) => <YourItem key={index} part={part} />)}
                    <Text style={{ marginBottom: 40 }}></Text>
                </ScrollView>) : (<Text>No Items</Text>)}
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

export default YourItems;