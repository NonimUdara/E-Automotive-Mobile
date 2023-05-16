import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import StripeApp from "./StripeApp";
import StripePayment from "./StripePayment";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useSelector } from "react-redux";

export default function App() {
  return (
    <StripeProvider publishableKey="pk_test_51N1DBBIcQPaMmd0Kitgwpu1HRAZxuFKrdac53qE4alOJZ5GURZkFuDfcPmCqFVFdUHXjTyOuX5Um31ffNeBavZyz00pIOY6omo" >
      <StripePayment />
      {/* <StripeApp/> */}
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
