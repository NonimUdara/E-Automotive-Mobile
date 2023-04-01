import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserDashboard = ({ navigation }) => {

    function navigatecarpart() {
        navigation.navigate('cart');
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
                    Parts Catalogues
                </Text>
                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatecarpart}>
                            <AntDesign name="car" size={30} color="black" />
                            <Text style={styles.text2}>Car Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatecarpart}>
                            <Fontisto name="motorcycle" size={30} color="black" />
                            <Text style={styles.text2}>Motorcycle Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatecarpart}>
                            <FontAwesome5 name="shuttle-van" size={30} color="black" />
                            <Text style={styles.text2}>Van Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatecarpart}>
                            <FontAwesome5 name="bus" size={30} color="black" />
                            <Text style={styles.text2}>Bus Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatecarpart}>
                            <MaterialCommunityIcons name="truck-cargo-container" size={30} color="black" />
                            <Text style={styles.text2}>Lorry Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatecarpart}>
                            <MaterialCommunityIcons name="dots-horizontal" size={30} color="black" />
                            <Text style={styles.text2}>Other parts</Text>
                        </TouchableOpacity>
                    </View>
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
    },
    body: {
        marginTop: 20,
        //flex: 1,
        //flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContent: {
        flex: 1,
        padding: 20,
        //marginRight: 150
    },
    bodyview: {
        marginTop: 10,
        height:40,
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 40,
    },
    text2: {
        marginLeft: 70,
        fontSize: 18
    }

})

export default UserDashboard;