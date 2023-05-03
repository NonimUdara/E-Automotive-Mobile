import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useSelector } from "react-redux";

import CartItem from './CartItem';

const UserDashboard = ({ navigation }) => {
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
                    <ScrollView>
                    {cartItems.map((item, index) => <CartItem key={index} cartItem={item} />)}
                </ScrollView>

                <Text style={styles.Heading3}>
                    Total amount = Rs {cartTotalAmount}
                </Text>
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
    },
    line: {
        textAlign: 'center',
        marginTop: -10,
        color: '#000',
        marginBottom: 10
    }

})

export default UserDashboard;