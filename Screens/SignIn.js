import React from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../UrlData";


const SignIn = ({ navigation }) => {
    const navigate = () => {
        navigation.navigate('SignUp');
    }
    const navigatehome = (userData) => {
        navigation.navigate('Home', userData);
    }
    // const navigateError = (message) => {
      //  navigation.navigate('Error', message);
    //}

    const handleSubmitData = (values, {resetForm}) => {
        const url = api.baseUrl + "/api/memberlog";
        const dataToSend = values;
        axios.post(url, dataToSend)
            .then(res => {
                //reset the sign in form data.
                resetForm();
                navigatehome(res.data.data.userData);
                navigateToast();
            })
            .catch(err => {
           //     navigateError(err.response.data.message);
            });
    };

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .required('Password is required'),
    })

    return (
        <View style={styles.mainView}>
            <View style={styles.TopView}>
                <Image
                    style={styles.ImageStyle}
                    source={require('../assets/images/AutomotiveBackground.jpg')}
                />
            </View>
            <KeyboardAvoidingView style={styles.BottomView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -60} >
                <ScrollView>
                    <Text style={styles.Heading}>
                        Signin
                    </Text>
                    <Text numberOfLines={1} style={styles.line}>
                        ___________________________________
                    </Text>

                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleSubmitData}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, isValid, values, touched }) => (
                            <View style={styles.FormView}>
                                <TextInput
                                    onChangeText={handleChange('email')}
                                    placeholder={"Your Email"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    style={styles.TextInput}
                                    
                                />
                                {errors.email && touched.email &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                                }                               
                                <TextInput
                                    onChangeText={handleChange('password')}
                                    placeholder={"Password"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    style={styles.TextInput}
                                    secureTextEntry={true}
                                    
                                />
                                {errors.password && touched.password &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                                }

                                <TouchableOpacity style={!isValid ? styles.ButtonDisabled : styles.Button} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={styles.ButtonText}>
                                        Sign in
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.TextButton} onPress={navigate}>
                                    <Text>
                                        <Text style={styles.SignUpText}>Click</Text> here to Signup
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>


        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TopView: {
        width: '100%',
        height: '20%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BottomView: {
        width: '100%',
        height: '80%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    ImageStyle: {
        width: '100%',
        height: 300,
        marginTop: 150
    },
    Heading: {
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    line: {
        textAlign: 'center',
        marginTop: -10,
        color: '#11A9FF'
    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 30
    },
    TextInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#F3F3F3',
        height: 52,
        borderRadius: 10,
        paddingLeft: 5,
        marginTop: 20,
        color: '#000',
        backgroundColor: '#F3F3F3'
    },
    Button: {
        width: '90%',
        color: '#fff',
        height: 52,
        backgroundColor: '#11A9FF',
        borderRadius: 15,
        marginTop: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    ButtonDisabled: {
        width: '90%',
        color: '#fff',
        height: 52,
        backgroundColor: '#ccc',
        borderRadius: 15,
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5
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


export default SignIn;