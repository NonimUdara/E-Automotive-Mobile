import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const Part = (props) => {
    let imageUri = 'https://bootdey.com/img/Content/avatar/avatar6.png';

    if (props.part.imageUrl) {
        imageUri = `data:image/jpg;base64,${props.part.imageUrl.image}`;
    }
    return (
        <View>
            <Text>
                {props.part.name}
            </Text>
            <Text>
                {props.part.condition}
            </Text>
            <Text>
                {props.part.type}
            </Text>
            <Image
                style={styles.avatar}
                source={{ uri: imageUri }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    avatar: {
        width: 130,
        height: 130,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 30,
    },
})

export default Part;