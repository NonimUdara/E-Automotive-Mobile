import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Profile = ({ navigation, route }) => {

    function navigatelogout() {
        navigation.navigate('SignIn');
    }

    const { params: user } = route;
    console.log("Profile", route);

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image
                style={styles.avatar}
                source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
            />
            <View style={styles.body}>
                <View style={styles.nameview}>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
                <View style={styles.bodyContent}>
                    <View style={styles.bodyview}>
                        <MaterialIcons name="email" size={24} color="black" />
                        <Text style={styles.text2}>{user.email}</Text>
                    </View>
                    <View style={styles.bodyview}>
                        <AntDesign name="phone" size={24} color="black" />
                        <Text style={styles.text2}>{user.phone}</Text>
                    </View>
                    <View style={styles.bodyview}>
                        <Entypo name="address" size={24} color="black" />
                        <Text style={styles.text2}>Opcion 2</Text>
                    </View>
                    <View style={styles.bodyview}>
                        <Entypo name="location-pin" size={24} color="black" />
                        <Text style={styles.text2}>Opcion 2</Text>
                    </View>
                    <View style={styles.bodyview}>
                        <TextInput
                            placeholder={"Add your Address"}
                            placeholderTextColor={"#a1a1a1"}
                            style={styles.TextInput}
                        />
                        <TouchableOpacity style={styles.AddButton} >
                            <Text>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bodyview}>
                        <TextInput
                            placeholder={"Add your Postal Code"}
                            placeholderTextColor={"#a1a1a1"}
                            style={styles.TextInput}
                        />
                        <TouchableOpacity style={styles.AddButton} >
                            <Text>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>


                </View>
                <View style={styles.bodyview2}>
                    <TouchableOpacity style={styles.LogoutButton} onPress={navigatelogout}>
                        <Text>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#41B93E',
        height: 100,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 30,
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        padding: 20,
        marginRight: 150
    },
    bodyview: {
        marginTop: 20,
        height: 25,
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 40,
    },
    bodyview2: {
        marginTop: 400,
        height: 25,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text2: {
        marginLeft: 40
    },
    nameview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        fontStyle: 'italic'
    },
    TextInput: {
        width: '120%',
        borderWidth: 1,
        borderColor: '#F3F3F3',
        height: 40,
        borderRadius: 10,
        paddingLeft: 10,
        marginLeft: 0,
        marginTop: 20,
        color: '#000',
        backgroundColor: 'white'
    },
    AddButton: {
        width: '50%',
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
    LogoutButton: {
        width: '50%',
        color: '#fff',
        height: 40,
        backgroundColor: '#41B93E',
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Profile;