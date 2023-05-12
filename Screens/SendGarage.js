import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from "react-redux";

import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../UrlData";
import ImagePicker1 from './ImagePicker';
import user from '../Store/reducers/user';

const SignUp = ({ navigation }) => {

    const userData = useSelector((state) => state.user);
    const [pickerResult, setPickerResult] = useState(null);
    const [hasImage, setHasImage] = useState(false);

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

    const getImageData = (imagePickerResult) => {
        setPickerResult({ imagePickerResult });
        const setImage = imagePickerResult?.assets[0]?.base64;
        setImage ? setHasImage(true) : setHasImage(false);
    }

    const handleSubmit = (values, { resetForm }) => {
        const url = api.baseUrl + "/garage/save";
        //const image = { title: 'Test', image: pickerResult?.imagePickerResult?.assets[0]?.base64 }
        const dataToSend = { ...values, image1: pickerResult?.imagePickerResult?.assets[0]?.base64, email: userData.email };
        axios.post(url, dataToSend)
            .then(res => {
                //  console.log('response from db', res.data);
                resetForm();
                setPickerResult(null);
                setHasImage(false);

                //navigate to sign in form
                navigate();

                showMessage({
                    message: 'Garage send Successfully',
                    type: 'success',
                    duration: 3000,
                    floating: true,
                    icon: { icon: 'auto', position: 'left' },
                    position: 'top',
                });
            })
            .catch(err => {
                //console.log(err.response.data.message);
                navigateError();
            });
    };

    const loginValidationSchema = yup.object().shape({
        town: yup
            .string()
            .required('Town is Required'),
        name: yup
            .string()
            .required('Name is Required'),
        address: yup
            .string()
            .required('Address is Required'),
        number: yup
            .string()
            .required('Phone Number is required'),
        latitude: yup
            .string()
            .required('Latitude is required'),
        longitude: yup
            .string()
            .required('Longitude is required'),
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
                        Send Your Garage Details
                    </Text>
                    <Formik
                        initialValues={{
                            name: '',
                            town: '',
                            address: '',
                            number: '',
                            latitude: '',
                            longitude: '',
                            access: 'False'
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, isValid, values, touched }) => (
                            <View style={styles.FormView}>
                                <Text style={styles.TextFormI}>
                                    Select your garage Picture
                                </Text>
                                <ImagePicker1 getImageData={getImageData} />
                                {!hasImage &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>Image is required</Text>
                                }
                                <Text style={styles.TextForm1}>
                                    Garage Name
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    placeholder={"Your Garage Name"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    style={styles.TextInput}
                                />
                                {errors.name && touched.name &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                                }
                                <Text style={styles.TextForm1}>
                                    Nearest town
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('town')}
                                    placeholder={"Your Nearest town"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('town')}
                                    value={values.town}
                                    style={styles.TextInput}
                                />
                                {errors.town && touched.town &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.town}</Text>
                                }
                                <Text style={styles.TextForm2}>
                                    Address
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('address')}
                                    placeholder={"Your Garage Address"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                    style={styles.TextInput}
                                />
                                {errors.address && touched.address &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
                                }
                                <Text style={styles.TextForm3}>
                                    Phone Number
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('number')}
                                    placeholder={"number"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('number')}
                                    value={values.number}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.number && touched.number &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.number}</Text>
                                }
                                <Text style={styles.TextForm4}>
                                    Location Latitude
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('latitude')}
                                    placeholder={"Your Location Latitude"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('latitude')}
                                    value={values.latitude}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.latitude && touched.latitude &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.latitude}</Text>
                                }
                                <Text style={styles.TextForm5}>
                                    Location Longitude
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('longitude')}
                                    placeholder={"Your Location Longitude"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('longitude')}
                                    value={values.longitude}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.longitude && touched.longitude &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.longitude}</Text>
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
        marginRight: 280
    },
    TextForm2: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 310
    },
    TextForm3: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 270
    },
    TextForm4: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 255
    },
    TextForm5: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 245
    }
})


export default SignUp;