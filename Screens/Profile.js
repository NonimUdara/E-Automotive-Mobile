import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from 'react-native-gesture-handler';
import axios from "axios";
import { clearCart } from '../Store/actions/cart';

import api from "../UrlData";
import { addUserData } from "../Store/actions/user";

const Profile = ({ navigation, route }) => {

    const dispatch = useDispatch();

    const { params: user } = route;
    const userData = useSelector((state) => state.user);
    const products = useSelector((state) => state.products);
    const [address, setAddress] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNo, setPhoneNo] = useState(user.phone);
    const [name, setName] = useState(user.name);

    function navigatelogout() {
        dispatch(clearCart());

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

    function navigatecontactadmin() {

        navigation.navigate('ContactUs');
    }

    const handleAddAddress = () => {
        const url = api.baseUrl + `/user/update/${userData.userId}`;
        const data = {
            address: address
        }

        axios.put(url, data)
            .then((res) => {
                //console.log("Address Response: ", res.data);
                setAddress('');
                showMessage({
                    message: 'Address Added Successfully',
                    type: 'success',
                    duration: 3000,
                    floating: true,
                    icon: { icon: 'auto', position: 'left' },
                    position: 'top',

                });
            })
            .catch((err) => {
                //console.log("Error updating Address: ", err);
                setAddress('');
            })
        dispatch(addUserData(data));
    }

    const handlePostalCode = () => {
        const url = api.baseUrl + `/user/update/${userData.userId}`;
        const data = {
            postalcode: postalCode
        }

        axios.put(url, data)
            .then((res) => {
                //console.log("Postal Code Response: ", res.data);
                setPostalCode('');
                showMessage({
                    message: 'Postal Code Added Successfully',
                    type: 'success',
                    duration: 3000,
                    floating: true,
                    icon: { icon: 'auto', position: 'left' },
                    position: 'top',

                });

            })
            .catch((err) => {
                console.log("Error updating Postal Code: ", err);
                setPostalCode('');
            })
        dispatch(addUserData(data));
    }

    const navigateToYourItems = () => {
        navigation.navigate('YourItems');
    }

    const handleNameAndPhoneNo = () => {
        const url = api.baseUrl + `/user/update/${userData.userId}`;
        const data = {
            phone: phoneNo,
            name: name,
        }
        axios.put(url, data)
            .then((res) => {
                showMessage({
                    message: 'Profile Updated Successfully',
                    type: 'success',
                    duration: 3000,
                    floating: true,
                    icon: { icon: 'auto', position: 'left' },
                    position: 'top',

                });
                //console.log("Name and Phone No Response: ", res.data);
            })
            .catch((err) => {
                console.log("Error updating Name and Phone No: ", err);
            })
        dispatch(addUserData(data));
    }

    let imageUri = 'https://bootdey.com/img/Content/avatar/avatar6.png';

    if (user.image) {
        imageUri = `data:image/jpg;base64,${user.image}`;
    }

    return (
        <View style={styles.container}>
            <Image
                style={styles.header}
                source={require('../assets/images/AutomotiveBackground.jpg')}
            />
            <Image
                style={styles.avatar}
                source={{ uri: imageUri }}
            />
            <KeyboardAvoidingView style={styles.BottomView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -60} >
                <ScrollView style={{ marginTop: 75, marginBottom: -70 }}>
                    <Text style={{ marginTop: -60, marginBottom: -20 }}></Text>
                    <View style={styles.body}>
                        <View style={styles.nameview}>
                            <TextInput
                                style={styles.name}
                                value={name}
                                onChangeText={name => setName(name)}
                            />
                        </View>
                        <View style={styles.bodyContent}>
                            <View style={styles.bodyview}>
                                <MaterialIcons name="email" size={24} color="black" />
                                <Text style={styles.text3}>{user.email}</Text>
                            </View>
                            <View style={styles.bodyview}>
                                <AntDesign name="phone" size={24} color="black" />

                                <TextInput
                                    style={styles.text2}
                                    value={phoneNo}
                                    onChangeText={phoneNo => setPhoneNo(phoneNo)}
                                />
                            </View>
                            <View style={styles.bodyview}>
                                <Entypo name="address" size={24} color="black" />
                                <Text style={styles.text3}>{userData.address}</Text>
                            </View>
                            <View style={styles.bodyview}>
                                <Entypo name="location-pin" size={24} color="black" />
                                <Text style={styles.text3}>{userData.postalcode}</Text>
                            </View>
                            <View style={styles.bodyview3}>
                                <TouchableOpacity style={styles.LogoutButton} onPress={handleNameAndPhoneNo} disabled={!(name.length > 0 && phoneNo.length > 0)}>
                                    <Text>
                                        Update
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyview3}>
                                <TouchableOpacity style={styles.PartstButton} onPress={navigateToYourItems}>
                                    <Text>
                                        View Your Items
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyview3}>
                                <TouchableOpacity style={styles.PartstButton}>
                                    <Text>
                                        View Your Sold Items
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyview3}>
                                <TouchableOpacity style={styles.PartstButton} onPress={navigatecontactadmin}>
                                    <Text>
                                        Contact Admin
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyview}>
                                <TextInput
                                    placeholder={"Add your Address"}
                                    placeholderTextColor={"#a1a1a1"}
                                    value={address}
                                    style={styles.TextInput}
                                    onChangeText={address => setAddress(address)}
                                />
                                <TouchableOpacity style={styles.AddButton} onPress={handleAddAddress} disabled={address.length <= 0}>
                                    <Text>
                                        Add
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.bodyview}>
                                <TextInput
                                    placeholder={"Add your Postal Code"}
                                    placeholderTextColor={"#a1a1a1"}
                                    value={postalCode}
                                    style={styles.TextInput}
                                    onChangeText={postalCode => setPostalCode(postalCode)}
                                />
                                <TouchableOpacity style={styles.AddButton} onPress={handlePostalCode} disabled={postalCode.length <= 0}>
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
            </KeyboardAvoidingView>


        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 100
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