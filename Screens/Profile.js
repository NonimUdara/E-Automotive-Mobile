import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';

const Profile = ({ navigation, route }) => {
    const userData = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    //console.log("User Data", userData);
    //console.log("products", products);

    function navigatelogout() {

        showMessage({

            message: 'Logout Successfully',
            type: 'success',
            duration: 3000,
            floating: true,
            icon: { icon: 'auto', position: 'left' },
            position: 'top',

        });

        navigation.navigate('SignIn');
    }



    const { params: user } = route;
    //console.log("Profile", user);

    let imageUri = 'https://bootdey.com/img/Content/avatar/avatar6.png';

    if (user.image) {
        imageUri = `data:image/jpg;base64,${user.image}`;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image
                style={styles.avatar}
                source={{ uri: imageUri }}
            />
            <ScrollView style={{marginTop:75, marginBottom: -70}}>
                <Text style={{marginTop:-60, marginBottom: -20}}></Text>
                <View style={styles.body}>
                    <View style={styles.nameview}>
                        <TextInput style={styles.name}>{user.name}</TextInput>
                    </View>
                    <View style={styles.bodyContent}>
                        <View style={styles.bodyview}>
                            <MaterialIcons name="email" size={24} color="black" />
                            <TextInput style={styles.text2}>{user.email}</TextInput>
                        </View>
                        <View style={styles.bodyview}>
                            <AntDesign name="phone" size={24} color="black" />
                            <TextInput style={styles.text2}>{user.phone}</TextInput>
                        </View>
                        <View style={styles.bodyview}>
                            <Entypo name="address" size={24} color="black" />
                            <Text style={styles.text3}>null</Text>
                        </View>
                        <View style={styles.bodyview}>
                            <Entypo name="location-pin" size={24} color="black" />
                            <Text style={styles.text3}>null</Text>
                        </View>
                        <View style={styles.bodyview3}>
                            <TouchableOpacity style={styles.LogoutButton}>
                                <Text>
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bodyview3}>
                            <TouchableOpacity style={styles.PartstButton}>
                                <Text>
                                    View Your Parts
                                </Text>
                            </TouchableOpacity>
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

            </ScrollView>

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
        marginTop: 50,
        height: 25,
        flexDirection: 'row',
        marginBottom: 220,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyview3: {
        marginTop: 20,
        height: 25,
        width: '100%',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 70,
    },
    text2: {
        fontStyle: 'italic',
        borderColor: '#F3F3F3',
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: 40,
        width: 220,
        height: 40,
        paddingLeft: 10,
        marginTop: -10
    },
    text3: {
        marginLeft: 40,
        width: 1000
    },
    nameview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        fontStyle: 'italic',
        borderColor: '#F3F3F3',
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
    PartstButton: {
        width: '50%',
        color: '#fff',
        height: 40,
        width: 150,
        backgroundColor: '#41B93E',
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Profile;