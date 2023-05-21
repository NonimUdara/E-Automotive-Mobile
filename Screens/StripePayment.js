import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { useDispatch, useSelector } from "react-redux";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
import api from "../UrlData";
import { clearCart } from '../Store/actions/cart';

const StripePayment = ({ navigation }) => {
    //console.log("navigation", navigation);
    //ADD localhost address of your server
    const API_URL = "http://10.0.2.2:8000";

    const user = useSelector((state) => state.user);
    const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
    const dispatch = useDispatch();
    //console.log("cartTotalAmount: ", cartTotalAmount);

    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();

    const navigate = () => {
        navigation.navigate('cart');
    }

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currency: 'usd',
                email: user.email,
                amount: cartTotalAmount
            }),
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
    };

    const handleSubmit = async (values, { resetForm }) => {
        const urlUsers = api.baseUrl + "/payment/save";
        const dataToSend = { ...values };

        //1.Gather the customer's billing information (e.g., email)
        if (!cardDetails) {
            showMessage({
                message: 'Please enter Complete card details',
                type: 'danger',
                duration: 3000,
                floating: true,
                icon: { icon: 'auto', position: 'left' },
                position: 'top',
            });
            //Alert.alert("Please enter Complete card details");
            return;
        }
        //2.Fetch the intent client secret from the backend
        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            //2. confirm the payment
            if (error) {
                console.log("Unable to process payment");
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    paymentMethodType: 'Card',
                });
                if (error) {
                    showMessage({
                        message: 'Please enter Complete card details',
                        type: 'danger',
                        duration: 3000,
                        floating: true,
                        icon: { icon: 'auto', position: 'left' },
                        position: 'top',
                    });
                    //alert(`Payment Confirmation Error ${error.message}`);
                } else if (paymentIntent) {
                    axios.post(urlUsers, dataToSend)
                        .then(res => {
                            resetForm();
                            showMessage({
                                message: 'Payment Successfully',
                                type: 'success',
                                duration: 3000,
                                floating: true,
                                icon: { icon: 'auto', position: 'left' },
                                position: 'top',
                            });
                            dispatch(clearCart());
                            navigate();

                            //alert("Payment Successful");
                        })
                        .catch(err => {
                            //console.log(err.response.data.message);
                            //navigateError(err.response.data.message);
                        });
                    //console.log("Payment successful ", paymentIntent);
                }
            }
        } catch (e) {
            console.log(e);
        }
        //3.Confirm the payment with the card details

    };

    const loginValidationSchema = yup.object().shape({
        name: yup
            .string()
            .required("Name is Required"),
        address: yup
            .string()
            .required('Address is Required'),
        postal: yup
            .string()
            .required('Postal Code is Required'),
        email: yup
            .string()
            .required('Email is Required')
            .email('Please enter valid email'),
        phone: yup
            .string()
            .required('Phone Number is Required'),
        amount: yup
            .string()
            .required('Amount is Required')

    })

    return (

        <View style={styles.mainView}>
            <View>
            </View>
            <KeyboardAvoidingView style={styles.BottomView} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : -60} >
                <ScrollView style={styles.ScrollView} >
                    <Text style={styles.Heading}>
                        Payment
                    </Text>
                    <Text numberOfLines={1} style={styles.line}>
                        ___________________________________
                    </Text>

                    <Formik
                        initialValues={{
                            name: user.name,
                            address: user.address || '',
                            postal: user.postalcode || '',
                            email: user.email,
                            phone: user?.phone || '',
                            card: '',
                            amount: cartTotalAmount.toString()
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
                                <Text style={{ marginRight: 275, marginTop: 20 }}>
                                    Enter Address
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('address')}
                                    placeholder={"Your Full Address"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('address')}
                                    value={values.address}
                                    style={styles.TextInput}
                                />
                                {errors.address && touched.address &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.address}</Text>
                                }
                                <Text style={{ marginRight: 252, marginTop: 20 }}>
                                    Enter Postal Code
                                </Text>
                                <TextInput
                                    onChangeText={handleChange('postal')}
                                    placeholder={"Your Full Postal code"}
                                    placeholderTextColor={"#a1a1a1"}
                                    onBlur={handleBlur('postal')}
                                    value={values.postal}
                                    style={styles.TextInput}
                                    keyboardType='numeric'
                                />
                                {errors.postal && touched.postal &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.postal}</Text>
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
                                <Text style={{ marginRight: 275, marginTop: 20 }}>
                                    Enter Amount
                                </Text>
                                <Text style={styles.TextInputAmount}>
                                    <Text style={{margin:1000}}>
                                        {values.amount}
                                    </Text>                                    
                                </Text>
                                {errors.amount && touched.amount &&
                                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.amount}</Text>
                                }
                                <Text style={{ marginRight: 250, marginTop: 20 }}>
                                    Payment Methods
                                </Text>
                                <CardField
                                    postalCodeEnabled={false}
                                    placeholder={{
                                        number: "4242 4242 4242 4242",
                                    }}
                                    //zonBlur={handleBlur('card')}
                                    cardStyle={styles.card}
                                    style={styles.TextInputCard}
                                    onCardChange={cardDetails => {
                                        setCardDetails(cardDetails);
                                    }}
                                    // onCardChange={() => handleChange('card')}
                                    // onCardChange={(cardDetails) => {
                                    //     //console.log('cardDetails', cardDetails);
                                    //     setCardDetails(cardDetails)
                                    // }}
                                />

                                <TouchableOpacity style={!isValid ? styles.ButtonDisabled : styles.Button} onPress={handleSubmit} disabled={!isValid}>
                                    <Text style={styles.ButtonText}>
                                        Pay
                                    </Text>
                                </TouchableOpacity>

                                <Text></Text>
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
        backgroundColor: '#fff'
    },
    ScrollView: {
        marginTop: 20,
        marginBottom: 0
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
        backgroundColor: '#F3F3F3'
    },
    TextInputCard: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#F3F3F3',
        height: 52,
        borderRadius: 10,
        paddingLeft: 5,
        marginTop: 10,
        color: '#000',
        backgroundColor: '#efefefef'
    },
    TextInputAmount: {
        width: '90%',
        borderWidth: 1,
        borderColor: '#F3F3F3',
        height: 52,
        borderRadius: 10,
        paddingLeft: 5,
        marginTop: 10,
        margin:'auto',
        color: '#000',
        backgroundColor: '#F3F3F3',
        paddingLeft: 5,
        padding: 15
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
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
    card: {
        backgroundColor: "#efefefef",
    },
})


export default StripePayment;