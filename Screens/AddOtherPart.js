import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { showMessage } from 'react-native-flash-message';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../UrlData";
import ImagePicker12 from './ImagePicker';
import Product from '../models/product';
import { addProducts } from '../Store/actions/products';
import { PRODUCT_TYPES } from '../data/dummy-data';

const AddOtherPart = ({ navigation }) => {
    const userData = useSelector((state) => state.user);
    const [pickerResult, setPickerResult] = useState(null);
    const [hasImage, setHasImage] = useState(false);
    const dispatch = useDispatch();

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
        // console.log("imagePickerResult?.pickerResult?.assets[0]?.base64", imagePickerResult?.assets[0].base64);
    }

    const handleSubmit = (values, { resetForm }) => {
        const url = api.baseUrl + "/part/save";
        // console.log("plain", pickerResult);
        // console.log("pickerResult", pickerResult?.assets[0]?.base64);
        // console.log("userData.id", userData.id);
        const image = { title: 'Test', image: pickerResult?.imagePickerResult?.assets[0]?.base64 }
        const dataToSend = { ...values, image: image, ownerId: userData.id, type: PRODUCT_TYPES.other };
        //console.log(dataToSend);
        axios.post(url, dataToSend)
            .then(res => {
                //  console.log('response from db', res.data);
                resetForm();
                setPickerResult(null);
                setHasImage(false);

                //navigate to sign in form
                navigate();

                showMessage({
                    message: 'Part Added Successfully',
                    type: 'success',
                    duration: 3000,
                    floating: true,
                    icon: { icon: 'auto', position: 'left' },
                    position: 'top',
                });

                navigation.navigate('OtherParts')

                const url = api.baseUrl + "/parts";

                axios.get(url).then(res => {
                    if (res.data.success) {
                        const prodArray = [];
                        res?.data?.existingPosts.forEach(element => {
                            prodArray.push(new Product(
                                element._id,
                                element.ownerId,
                                element.name,
                                element.image,
                                element.condition,
                                element.price,
                                element.model,
                                element.type
                            ))
                        });
                        dispatch(addProducts(prodArray))
                    }
                }).catch(err => {
                    //Flash message with error
                });
            })
            .catch(err => {
                //console.log(err.response.data.message);
                navigateError();
            });
    };

    const loginValidationSchema = yup.object().shape({
        model: yup
            .string()
            .required('Vehicle Model is Required'),
        name: yup
            .string()
            .required('Name is Required'),
        price: yup
            .string()
            .required('Price is Required'),
        condition: yup
            .string()
            .required('Condition is required'),
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
                        Add other part
                    </Text>
                    <Formik
                        initialValues={{
                            name: '',
                            model: '',
                            price: '',
                            type: '',
                            condition: '',
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ handleChange, handleBlur, handleSubmit, errors, isValid, values, touched }) => (
                            <View style={styles.FormView}>
                                <Text style={styles.TextFormI}>
                                    Select spare part picture
                                </Text>
                                <ImagePicker12 getImageData={getImageData} />
                                {!hasImage &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>Image is required</Text>
                                }
                                <Text style={styles.TextForm1}>
                                    Part Name
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    placeholder={"Enter Your Part Name"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    style={styles.TextInput}
                                />
                                {errors.name && touched.name &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                                }
                                <Text style={styles.TextForm2}>
                                    Vehicle Model
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('model')}
                                    placeholder={"Enter Your Part Model"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('model')}
                                    value={values.model}
                                    style={styles.TextInput}
                                />
                                {errors.model && touched.model &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.model}</Text>
                                }
                                <Text style={styles.TextForm3}>
                                    Price
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('price')}
                                    placeholder={"Enter Your Part Price in RS"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('price')}
                                    value={values.price}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.price && touched.price &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.price}</Text>
                                }
                                <Text style={styles.TextForm4}>
                                    Condition
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('condition')}
                                    placeholder={"Enter Your Part Condition"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('condition')}
                                    value={values.condition}
                                    style={styles.TextInput}
                                />
                                {errors.condition && touched.condition &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.condition}</Text>
                                }

                                <TouchableOpacity style={!isValid ? styles.ButtonDisabled : styles.Button} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={styles.ButtonText}>
                                        Add
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
        borderTopRightRadius: 70,
        marginBottom: 20
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
        paddingLeft: 110,
        marginTop: 20,
        marginBottom: 20,
        marginRight: 287,
        width: 300
    },
    TextForm1: {
        paddingRight: 0,
        marginTop: 20,
        marginRight: 290
    },
    TextForm2: {
        paddingLeft: 20,
        marginTop: 20,
        marginRight: 290
    },
    TextForm3: {
        paddingRight: 35,
        marginTop: 20,
        marginRight: 290,
    },
    TextForm4: {
        paddingRight: 30,
        marginTop: 20,
        marginRight: 265
    }
})


export default AddOtherPart;