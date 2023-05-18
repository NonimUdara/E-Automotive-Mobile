import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from "react-redux";

import { addToCart } from '../Store/actions/cart';

const Part = (props) => {
    const dispatch = useDispatch();

    let imageUri = 'https://bootdey.com/img/Content/avatar/avatar6.png';

    if (props.part.imageUrl) {
        imageUri = `data:image/jpg;base64,${props.part.imageUrl.image}`;
    }

    const handleAddtoCart = (part) => {
        //console.log("part", part);
        dispatch(addToCart(part));
    }

    return (
        <View style={{ marginTop: 50 }}>
            <View style={{ marginLeft: 20, marginTop: 10 }}>
                <View style={{display: 'flex'}}>
                    <Text style={{ marginTop: 0 }}>
                        {props.part.name}
                    </Text>
                    <Text>
                        {props.part.model}
                    </Text>
                    <Text>
                        {props.part.price}
                    </Text>
                    <Text>
                        {props.part.condition}
                    </Text>
                    <Image
                        style={styles.avatar}
                        source={{ uri: imageUri }}
                    />
                </View>
                <TouchableOpacity style={styles.AddButton} onPress={()=> handleAddtoCart(props.part)}>
                    <Text style={{fontSize: 12, color: 'white'}}>
                        Add to
                    </Text>
                    <Text style={{fontSize: 12, color: 'white'}}>
                        Cart
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 100,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
    },
    AddButton: {
        width: '20%',
        color: '#fff',
        height: 45,
        width: 70,
        backgroundColor: '#41B93E',
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 280,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
})

export default Part;