import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from "react-redux";

import { addToCart, removeFromCart } from '../Store/actions/cart';

const CartItem = (props) => {
    const dispatch = useDispatch();

    let imageUri = 'https://bootdey.com/img/Content/avatar/avatar6.png';

    if (props.cartItem.image.image) {
        imageUri = `data:image/jpg;base64,${props.cartItem.image.image}`;
    }
    console.log("CartItem", props.cartItem);

    const handleAdd = (part) => {
        console.log("part", part);
        const cartPart = {
            id: part.productId,
            price: part.productPrice,
            name: part.prodTitle,
            imageUrl: part.image
        }
        dispatch(addToCart(cartPart));
    }

    const handleRemove = (partId) => {
        console.log("part", partId);
        dispatch(removeFromCart(partId));
    }

    return (
        <View style={{ marginTop: 50 }}>
            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <View style={{ display: 'flex' }}>
                    <Text style={{ marginTop: 0 }}>
                        {props.cartItem.productTitle}
                    </Text>
                    <Text>
                        {props.cartItem.productPrice}
                    </Text>
                    <Image
                        style={styles.avatar}
                        source={{ uri: imageUri }}
                    />
                </View>
                <View style={styles.viewpm}>
                    <TouchableOpacity style={styles.PlusButton} onPress={() => handleAdd(props.cartItem)}>
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            +
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>
                        {props.cartItem.quantity}
                    </Text>
                    <TouchableOpacity style={styles.MinusButton} onPress={() => handleRemove(props.cartItem.id)}>
                        <Text style={{ fontSize: 12, color: 'white' }}>
                            -
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    addRemove: {
        display: 'flex',
    },
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
    },
    PlusButton: {
        width: '20%',
        color: '#fff',
        height: 25,
        width: 30,
        backgroundColor: '#41B93E',
        borderRadius: 5,
        marginTop: 0,
        marginLeft: 340,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    MinusButton: {
        width: '20%',
        color: '#fff',
        height: 25,
        width: 30,
        backgroundColor: '#41B93E',
        borderRadius: 5,
        marginTop: 0,
        marginLeft: 270,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    quantity: {
        marginTop: 4,
        marginLeft: 317,
        position: 'absolute',
    },
    viewpm: {
        marginBottom: 20,
    }
})

export default CartItem;