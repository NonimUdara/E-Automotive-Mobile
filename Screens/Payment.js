import React from "react";
import { StyleSheet } from "react-native";
import StripePayment from "./StripePayment";
import { StripeProvider } from "@stripe/stripe-react-native"

export default function Payment({navigation}) {
  return (
    // <StripeProvider publishableKey="pk_test_51N1DBBIcQPaMmd0Kitgwpu1HRAZxuFKrdac53qE4alOJZ5GURZkFuDfcPmCqFVFdUHXjTyOuX5Um31ffNeBavZyz00pIOY6omo" >
    //   <StripePayment navigation={navigation}/>
    //   {/* <StripeApp/> */}
    // </StripeProvider>

    //update stripe publishable key

    <StripeProvider publishableKey="pk_test_51QiFa22NxTyhzQ4xy1JRcdt8dGHYCPQmb4IMvcUlX2HyZpJDFl4HnPektBP89FmPsc0ge4ONiTCWvMeabvAqHUDz00Mh9LV9qW" >
      <StripePayment navigation={navigation}/>
      {/* <StripeApp/> */}
    </StripeProvider>

  );
}
