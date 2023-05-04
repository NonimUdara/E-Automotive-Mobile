import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from "react-redux";
import StripeApp from "./Payment";
import { StripeProvider } from "@stripe/stripe-react-native";

import CartItem from './CartItem';

const UserDashboard = ({ navigation }) => {

    const navigate = () => {
        
        navigation.navigate('Payment');
        
    }

    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const cartItems = useSelector((state) => {
        const transformedCartItems = [];
        //map cant be used because items is not an array,it is an object
        //so we have to get the keys and go through each objects
        for (const key in state.cart.items) {
            //since this is an array we can push any item for this
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
                image: state.cart.items[key].image,
            });
        }
        return transformedCartItems;
    });

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
                    Cart
                </Text>
                <TouchableOpacity style={styles.delete}>
                    <Text style={{ fontSize: 12, color: 'white' }}>
                        Delete All
                    </Text>
                </TouchableOpacity>
                <ScrollView>
                    <Text style={{ marginBottom: -50 }}></Text>
                    {cartItems.map((item, index) => <CartItem key={index} cartItem={item} />)}
                    <Text style={{ marginBottom: 50 }}></Text>
                </ScrollView>

                <View>
                    <Text style={styles.Heading3}>
                        Rs.{cartTotalAmount}.00
                    </Text>
                    <TouchableOpacity style={styles.checkout} onPress={navigate}>
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            Checkout
                        </Text>
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
    Heading3: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 5
    },
    line: {
        textAlign: 'center',
        marginTop: -10,
        color: '#000',
        marginBottom: 10
    },
    delete: {
        width: '20%',
        color: '#DD2727',
        height: 25,
        width: 80,
        backgroundColor: 'red',
        borderRadius: 5,
        marginTop: 88,
        marginLeft: 300,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    checkout: {
        width: '20%',
        color: '#DD2727',
        height: 25,
        width: 80,
        backgroundColor: '#41B93E',
        borderRadius: 5,
        marginTop: 0,
        marginLeft: 300,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },

})

export default UserDashboard;