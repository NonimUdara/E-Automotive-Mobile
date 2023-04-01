import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Button } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const Home = ({ navigation }) => {
    
    const navigate = () => {
        
        navigation.navigate('SignIn');

    }

    return (
        <View style={styles.mainView}>
            <View style={styles.TopView}>
                <Image
                    style={styles.ImageStyle}
                    source={require('../assets/images/AutomotiveHome.jpg')}
                />
            </View>
            <Text style={styles.Text1}>
                E-Automotives
            </Text>
            <KeyboardAvoidingView style={styles.BottomView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -60} >
                <View>
                    <View style={styles.View}>
                        <TouchableOpacity style={styles.Button} onPress={navigate}>
                            <Text style={styles.ButtonText}>
                                Get Start!
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.Text2}>
                            <FontAwesome5 name="facebook" size={35} color="#4267B2" onPress={() => Linking.openURL('https://web.facebook.com')}/>{"       "}
                            <AntDesign name="twitter" size={35} color="#1DA1F2" onPress={() => Linking.openURL('https://twitter.com')}/>{"     "}
                            <AntDesign name="instagram" size={35} color="#C13584" onPress={() => Linking.openURL('https://instagram.com')}/>{"     "}
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
    TopView: {
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BottomView: {
        width: '100%',
        height: '90%',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    ImageStyle: {
        width: '100%',
        height: 950,
        marginTop: 780
    },
    View: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 250
    },
    Text1: {
        color: 'white',
        fontStyle: 'italic',
        fontSize: 45,
        fontWeight: 'bold',
        marginTop: -120
    },
    Text2: {
        marginTop: 20,
    },
    Button: {
        width: '30%',
        color: '#fff',
        height: 35,
        backgroundColor: '#41B93E',
        borderRadius: 5,
        marginTop: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff'
    }
})

export default Home;