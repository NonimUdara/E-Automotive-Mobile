import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from "react-redux";

import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../UrlData";
import ImagePicker12 from './ImagePicker';
// import { addUserIdToCart } from '../Store/actions/cart';

const SignUp = ({ navigation }) => {
    const dispatch = useDispatch();
    const [pickerResult, setPickerResult] = useState(null);
    const [hasImage, setHasImage] = useState(false);

    const navigate = () => {

        navigation.navigate('SignIn');

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
        const urlUsers = api.baseUrl + "/api/users";
        const urlCart = api.baseUrl + "/cart/save";
        const dataToSend = { ...values, image: pickerResult?.imagePickerResult?.assets[0]?.base64 };

        axios.post(urlUsers, dataToSend)
            .then(res => {
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
                const cartDataToSend = {
                    userId: res?.data?.userData?._id,
                    items: [{productId: "123", productTitle:"qwert",productPrice:1234, quantity: 2, sum: 2458, image: "asdfgh"}, {productId: "12234543333", productTitle:"qwert",productPrice:1234, quantity: 2, sum: 2458, image: "asdfgh"}],
                    totalAmount: 0,
                }
                axios.post(urlCart, cartDataToSend).then(res =>{
                    // console.log("Carat Created........!", res);
                })
                .catch(err => {
                    // console.log("Cart Creation Error", err);
                })
                //console.log("res", res?.data?.userData);
                // dispatch(addUserIdToCart(res?.data?.userData?._id));
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
            <View style={styles.TopView}>
                <Image
                    style={styles.ImageStyle}
                    source={require('../assets/images/AutomotiveBackground.jpg')}
                />
            </View>
            <View>
            </View>
            <KeyboardAvoidingView style={styles.BottomView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -60} >
                <ScrollView style={styles.ScrollView} >
                    <Text style={styles.Heading}>
                        Signup
                    </Text>
                    <Text numberOfLines={1} style={styles.line}>
                        ___________________________________
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
                                <Feather name="user-plus" size={50} color="black" marginTop={10} marginBottom={5} />
                                <Text style={styles.TextForm3}>
                                    Select Profile picture
                                </Text>
                                <ImagePicker12 getImageData={getImageData} />
                                {!hasImage &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>Image is required</Text>
                                }
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
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.TextButton} onPress={navigate}>
                                    <Text style={{marginBottom: 20}}>
                                        <Text style={styles.SignUpText}>Click</Text> here to Signin
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        {/* <Button onPress={_pickImg} title="Open Picker" />
                        {pickerResult
                            ? <Image
                                source={{ uri: imageUri }}
                                style={{ width: 200, height: 200 }}
                            />
                            : null}
                        {pickerResult
                            ? <Text>
                                Keys on pickerResult:
                                {' '}
                                {JSON.stringify(Object.keys(pickerResult))}
                            </Text>
                            : null} */}
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
        alignItems: 'center',
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
        height: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70
    },
    ScrollView: {
        marginTop: 20,
        marginBottom: 80
    },
    ImageStyle: {
        width: '100%',
        height: 300,
        marginTop: 280
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
        marginBottom: 20,
        color: '#CFCFCF'
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
    SignUpText: {
        color: '#DD2727',
    },
    TextButton: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginTop: 20
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
    TextForm3: {
        paddingLeft: 60,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 287,
        width: 200
    },
    TextForm4: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 265
    }
})


export default SignUp;