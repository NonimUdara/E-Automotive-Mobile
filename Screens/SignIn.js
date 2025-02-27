import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from "react-redux";

import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';

import api from "../UrlData";
import * as userActions from "../Store/actions/user";
//import { addFetchedDataToCart } from '../Store/actions/cart';

const SignIn = ({ navigation }) => {
    const dispatch = useDispatch();
    const navigate = () => {

        navigation.navigate('SignUp');

    }
    const navigateError = (message) => {

        // navigation.navigate('Error', message);

        showMessage({
            message: (message),
            type: 'danger',
            duration: 3000,
            floating: true,
            icon: { icon: 'auto', position: 'left' },
            position: 'top',

        });

    }
    //  console.log("navigation", navigation);
    const navigatedashboard = (userData) => {

        showMessage({
            message: 'Login Successfull',
            type: 'success',
            duration: 3000,
            floating: true,
            icon: { icon: 'auto', position: 'left' },
            position: 'top',
        });

        navigation.navigate('homestack', userData);

    }

    const handleSubmitData = (values, { resetForm }) => {

        const url = api.baseUrl + "/api/memberlog";

        const dataToSend = values;
        axios.post(url, dataToSend)
            .then(response => {
                // reset the sign in form data.
                resetForm();
                //console.log("response.data.data.userData", response?.data?.data?.userData);
                dispatch(userActions.addUserData(response?.data?.data?.userData));
                navigatedashboard(response?.data?.data?.userData);
                const id = response?.data?.data?.userData.userId;
                //load the cart data to redux store
                //const cartUrl = api.baseUrl + `/cart`
                //console.log("cartUrl: ", cartUrl);
                //navigateToast();

                // axios.get(cartUrl)
                //     .then(res => {
                //         const cartItem = res.data.existingPosts.filter((post) => post.userId === id)
                //         console.log("Cart Items Response: ", res.data);
                //         console.log("cartItem: ", cartItem);
                //         dispatch(addFetchedDataToCart(cartItem[0]));
                //     })
                //     .catch(err => {
                //         console.log("Error in cart Items Loading", err);
                //     })
            })
            .catch(err => {

                //navigateError(err.response.data.message);
                navigateError(err.response.data.message);

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
                <ScrollView style={styles.ScrollView} >
                    <Text style={styles.Heading}>
                        Login
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
                                <Feather name="user" size={50} color="black" />
                                <Text style={styles.TextForm1}>
                                    Enter Email
                                </Text>
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
                                <Text style={styles.TextForm2}>
                                    Enter Password
                                </Text>
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
                                        Login
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
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    TopView: {
        width: '100%',
        height: '33%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    BottomView: {
        width: '100%',
        height: '85%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    ScrollView: {
        marginTop: 50
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
        marginTop: 30,
    },
    line: {
        textAlign: 'center',
        marginTop: -10,
        color: '#CFCFCF'
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
        backgroundColor: '#DD2727',
        borderRadius: 10,
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
        borderRadius: 10,
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
    },
    TextForm1: {
        textAlign: 'left',
        paddingRight: 0,
        marginTop: 50,
        marginRight: 290
    },
    TextForm2: {
        textAlign: 'left',
        paddingRight: 0,
        marginTop: 30,
        marginRight: 270
    }
})


export default SignIn;