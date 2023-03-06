import React from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../UrlData";


const SignUp = ({ navigation }) => {

    const navigate = () => {
        navigation.navigate('SignIn');
    }

    const navigateError = (message) => {
        navigation.navigate('Error', message);
    }

    const handleSubmit = (values, {resetForm}) => {
        const url = api.baseUrl + "/api/users";
        const dataToSend = { ...values, payment_status: 'pending' };
        console.log(dataToSend);
        axios.post(url, dataToSend)
            .then(res => {
                console.log('response from db', res.data);
                resetForm();
                //navigate to sign in form
                navigate();
            })
            .catch(err => {
                console.log(err.response.data.message);
                navigateError(err.response.data.message);
            });
    };

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        name: yup
            .string()
            .required('Name Address is Required'),
        age: yup
            .string()
            .required('Age Address is Required'),
        height: yup
            .string()
            .required('Height Address is Required'),
        weight: yup
            .string()
            .required('Weight Address is Required'),
        address: yup
            .string()
            .required('Address is Required'),
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
                    source={require('../assets/images/GymHome.png')}
                />
            </View>
            <KeyboardAvoidingView style={styles.BottomView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -60} >
                <ScrollView>
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
                            address: '',
                            age: '',
                            height: '',
                            weight: '',
                            payment_status: 'pending',
                            password: '',
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, isValid, values, touched }) => (
                            <View style={styles.FormView}>
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
                                    onChangeText={handleChange('address')}
                                    placeholder={"Your Address"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                    style={styles.TextInput}
                                />
                                {errors.address && touched.address &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
                                }
                                <TextInput
                                    onChangeText={handleChange('age')}
                                    placeholder={"Your Age"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('age')}
                                    value={values.age}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.age && touched.age &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.age}</Text>
                                }
                                <TextInput
                                    onChangeText={handleChange('height')}
                                    placeholder={"Your Height"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('height')}
                                    value={values.height}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.height && touched.height &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.height}</Text>
                                }
                                <TextInput
                                    onChangeText={handleChange('weight')}
                                    placeholder={"Your Weight"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('weight')}
                                    value={values.weight}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.weight && touched.weight &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.weight}</Text>
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
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.TextButton} onPress={navigate}>
                                    <Text>
                                        <Text style={styles.SignUpText}>Click</Text> here to Signin
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
        height: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        //overflow: hidden
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
        color: '#11A9FF'
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
        backgroundColor: '#F3F3F3'
    },
    Button: {
        width: '90%',
        color: '#fff',
        height: 52,
        backgroundColor: '#11A9FF',
        borderRadius: 15,
        marginTop: 10,
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
        marginTop: 10
    }
})


export default SignUp;