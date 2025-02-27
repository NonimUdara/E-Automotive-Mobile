import React, {useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useDispatch } from "react-redux";

import api from "../UrlData";
import Product from '../models/product';
import { addProducts } from '../Store/actions/products';

const PartsCatalogues = ({ navigation }) => {
    const dispatch = useDispatch();

    useEffect(() =>{
        const url = api.baseUrl + "/parts";

        axios.get(url).then(res => {
            if (res.data.success) {
              const prodArray = [];
              res?.data?.existingPosts.forEach(element => {
                prodArray.push(new Product(
                    element._id,
                    element.ownerId,
                    element.name,
                    element.image,
                    element.condition,
                    element.price,
                    element.model,
                    element.type,
                    element.email,
                  ))
              });
              dispatch(addProducts(prodArray))
            }
          }).catch(err => {
            //Flash message with error
        });
    },[]);

    function navigatecarpart() {
        navigation.navigate('CarParts');
    }

    function navigatemotorcyclepart() {
        navigation.navigate('MotorcycleParts');
    }

    function navigatevanpart() {
        navigation.navigate('VanParts');
    }

    function navigatebuspart() {
        navigation.navigate('BusParts');
    }

    function navigatelorrypart() {
        navigation.navigate('LorryParts');
    }

    function navigateotherpart() {
        navigation.navigate('OtherParts');
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
                        <TouchableOpacity style={styles.bodyview} onPress={navigatemotorcyclepart}>
                            <Fontisto name="motorcycle" size={30} color="black" />
                            <Text style={styles.text2}>Motorcycle Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatevanpart}>
                            <FontAwesome5 name="shuttle-van" size={30} color="black" />
                            <Text style={styles.text2}>Van Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatebuspart}>
                            <FontAwesome5 name="bus" size={30} color="black" />
                            <Text style={styles.text2}>Bus Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigatelorrypart}>
                            <MaterialCommunityIcons name="truck-cargo-container" size={30} color="black" />
                            <Text style={styles.text2}>Lorry Parts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bodyview} onPress={navigateotherpart}>
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
        marginTop: 30,
        height:50,
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 40,
    },
    text2: {
        marginLeft: 70,
        fontSize: 18
    }

})

export default PartsCatalogues;