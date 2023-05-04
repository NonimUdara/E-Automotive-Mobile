import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';

import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../UrlData";
import ImagePicker12 from './ImagePicker';

const SignUp = ({ navigation }) => {

    const [pickerResult, setPickerResult] = useState(null);
    const [hasImage, setHasImage] = useState(false);

    const navigate = () => {

        navigation.navigate('');

    }

    const navigateError = (message) => {

        // navigation.navigate('Error', message);
        // console.log(message);

        showMessage({
            message: (message),
            type: 'danger',
            duration: 3000,
            floating: true,
            icon: { icon: 'auto', position: 'left' },
            position: 'top',
        });

    }

    const getImageData = (imagePickerResult) => {
        setPickerResult({ imagePickerResult });
        const setImage = imagePickerResult?.assets[0]?.base64;
        setImage ? setHasImage(true) : setHasImage(false);
        // console.log("imagePickerResult?.pickerResult?.assets[0]?.base64", imagePickerResult?.assets[0].base64);
    }

    const handleSubmit = (values, { resetForm }) => {
        const url = api.baseUrl + "/api/users";
        // console.log("plain", pickerResult);
        // console.log("pickerResult", pickerResult?.assets[0]?.base64);
        //const image = { title: 'Test', image: pickerResult?.imagePickerResult?.assets[0]?.base64 }
        const dataToSend = { ...values, image: pickerResult?.imagePickerResult?.assets[0]?.base64 };
        //console.log(dataToSend);
        axios.post(url, dataToSend)
            .then(res => {
                //  console.log('response from db', res.data);
                resetForm();

                //navigate to sign in form
                navigate();

                showMessage({
                    message: 'Registered Successfully',
                    type: 'success',
                    duration: 3000,
                    floating: true,
                    icon: { icon: 'auto', position: 'left' },
                    position: 'top',
                });

            })
            .catch(err => {
                //console.log(err.response.data.message);
                navigateError(err.response.data.message);
            });
    };

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email is Required'),
        name: yup
            .string()
            .required('Name is Required'),
        phone: yup
            .string()
            .required('Phone Number is Required'),
        password: yup
            .string()
            .min(8, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })

    return (

        <View style={styles.mainView}>
            <KeyboardAvoidingView style={styles.BottomView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -60} >
                <ScrollView style={styles.ScrollView} >
                <Text style={styles.Heading}>
                        E-Automotives
                    </Text>
                    <Text numberOfLines={1} style={styles.line}>
                        ___________________________________

                    </Text>
                    <Text style={styles.Heading2}>
                        Checkout
                    </Text>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            phone: '',
                            password: '',
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, isValid, values, touched }) => (
                            <View style={styles.FormView}>
                                <Text style={styles.TextForm1}>
                                    Enter Name
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    placeholder={"Your Full Name"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    style={styles.TextInput}
                                />
                                {errors.name && touched.name &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                                }
                                <Text style={styles.TextForm2}>
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
                                    Enter phone
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('phone')}
                                    placeholder={"Your Phone Number"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('phone')}
                                    value={values.phone}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.phone && touched.phone &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.phone}</Text>
                                }
                                <Text style={styles.TextForm4}>
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
                                        Checkout
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
    Heading: {
        color: '#41B93E',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
    },
    Heading2: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    line: {
        textAlign: 'center',
        marginTop: -10,
        color: '#000',
        marginBottom: 10
    },
    mainView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BottomView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    ScrollView: {
        marginBottom: 0
    },
    FormView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    TextInput: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#F3F3F3',
        height: 52,
        borderRadius: 10,
        paddingLeft: 5,
        marginTop: 10,
        color: '#000',
        backgroundColor: '#F3F3F3',
    },
    Button: {
        width: '90%',
        color: '#fff',
        height: 52,
        backgroundColor: '#11A9FF',
        borderRadius: 10,
        marginTop: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
    TextForm1: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 290
    },
    TextForm2: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 290
    },
    TextForm4: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 265
    }
})


export default SignUp;