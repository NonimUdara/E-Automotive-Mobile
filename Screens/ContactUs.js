import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, TextArea } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from "react-redux";

import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../UrlData";

const ContactUs = ({ navigation }) => {

    const userData = useSelector((state) => state.user);

    const navigate = () => {

    }

    const navigateError = (error) => {

        // navigation.navigate('Error', message);
        // console.log(message);

        showMessage({
            message: (error),
            type: 'danger',
            duration: 3000,
            floating: true,
            icon: { icon: 'auto', position: 'left' },
            position: 'top',
        });

    }

    const handleSubmit = (values, { resetForm }) => {
        const url = api.baseUrl + "/contactus/save";
        //const image = { title: 'Test', image: pickerResult?.imagePickerResult?.assets[0]?.base64 }
        const dataToSend = { ...values, email: userData.email };
        axios.post(url, dataToSend)
            .then(res => {
                //  console.log('response from db', res.data);
                resetForm();

                //navigate to sign in form
                navigate();

                showMessage({
                    message: 'Message send Successfully',
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
        message: yup
            .string()
            .required('Message is Required'),
        type: yup
            .string()
            .required('Type is Required')
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
                        Contact Admin
                    </Text>
                    <Formik
                        initialValues={{
                            type: '',
                            message: ''
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, isValid, values, touched }) => (
                            <View style={styles.FormView}>
                                <Text style={styles.TextForm1}>
                                    Your Problem
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('type')}
                                    placeholder={"Account reladed/ Part related/ Garage reladed/ Other"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('type')}
                                    value={values.type}
                                    style={styles.TextInput}
                                />
                                {errors.type && touched.type &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.type}</Text>
                                }
                                <Text style={styles.TextForm2}>
                                    Message
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('message')}
                                    placeholder={"Enter Your Message"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('message')}
                                    value={values.message}
                                    style={styles.TextInput2}
                                    multiline={true}
                                />
                                {errors.message && touched.message &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.message}</Text>
                                }

                                <TouchableOpacity style={!isValid ? styles.ButtonDisabled : styles.Button} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={styles.ButtonText}>
                                        Send
                                    </Text>
                                </TouchableOpacity>
                                <Text style={{ marginBottom: 10 }}></Text>
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
        alignItems: 'center',
    },
    BottomView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    ScrollView: {
        marginBottom: 0
    },
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
    TextInput2: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#F3F3F3',
        height: 200,
        borderRadius: 10,
        paddingLeft: 5,
        marginTop: 10,
        padding: 5,
        color: '#000',
        backgroundColor: '#F3F3F3',
        textAlignVertical: 'top'
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
    TextButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
    },
    TextFormI: {
        paddingLeft: 160,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 287,
        width: 400
    },
    TextForm1: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 275,
    },
    TextForm2: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 300,
    }
})


export default ContactUs;