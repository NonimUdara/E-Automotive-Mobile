import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import '../assets/images/transparentLogo.png'

const Home = ({navigation, route}) => {

    const [userData, setUserData] = useState(null);
    console.log('Home', route);

    useEffect(() => {
        setUserData(route.params);
    },[]);

    function navigatelogout() {
        navigation.navigate('SignIn');
    }
    function navigatemessage() {
        navigation.navigate('Message');
    }
    function navigatecomeandleave() {
        navigation.navigate('ComeandLeave');
    }
    function navigaterequest() {
        navigation.navigate('Requests');
    }
    function navigatebmi() {
        navigation.navigate('BMICalculator');
    }
    function navigateprofile() {
        navigation.navigate('Profile', userData);
    }
    function navigateshedules() {
        navigation.navigate('Shedules');
    }

    return (
        <View style={styles.mainView}>
            <View style={styles.BottomView}>
                <Text style={styles.Heading}>
                    A+ Fitness
                </Text>
                <Text numberOfLines={1} style={styles.line}>
                    ___________________________________
                </Text>
                <Text style={styles.Heading2}>
                    Welcome
                </Text>
                <View style={styles.FormView}>
                    <TouchableOpacity style={styles.Button} onPress={navigateprofile}>
                        <Text style={styles.ButtonText}>
                            Your Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={navigatecomeandleave}>
                        <Text style={styles.ButtonText}>
                            Come & Leave
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={navigatemessage}>
                        <Text style={styles.ButtonText}>
                            Message
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={navigaterequest}>
                        <Text style={styles.ButtonText}>
                            Request
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={navigatebmi}>
                        <Text style={styles.ButtonText}>
                            BMI Calculator
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={navigateshedules}>
                        <Text style={styles.ButtonText}>
                            Workouts
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Button} onPress={navigatelogout}>
                        <Text style={styles.ButtonText}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.FormView}>
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
        backgroundColor: '#fff'
    },
    Heading: {
        color: '#11A9FF',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
    },
    Heading2: {
        color: '#000',
        fontSize: 45,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 60,
        fontStyle: 'italic'
    },
    line: {
        textAlign: 'center',
        marginTop: -10,
        color: '#000',
        marginBottom: 30
    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: -45
    },
    Button: {
        width: '90%',
        color: '#fff',
        height: 52,
        backgroundColor: '#11A9FF',
        borderRadius: 15,
        marginTop: 18,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#fff'
    },
    SignUpText: {
        color: '#11A9FF'
    },
    TextButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    }
})

export default Home;