import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';

import { combineReducers, legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import UserDashboard from './Screens/UserDashboard';
import Profile from './Screens/Profile';
import Home from './Screens/Home';
import Cart from './Screens/Cart';
import Garage from './Screens/Garage';
import PartsCatalogues from './Screens/PartsCatalogues';
import CarParts from './Screens/CarParts';
import MotorcycleParts from './Screens/MotorcycleParts';
import VanParts from './Screens/VanParts';
import BusParts from './Screens/BusParts';
import LorryParts from './Screens/LorryParts';
import OtherParts from './Screens/OtherParts';
import AddCarPart from './Screens/AddCarPart';
import AddMotorcyclePart from './Screens/AddMotorcyclePart';
import AddVanPart from './Screens/AddVanPart';
import AddBusPart from './Screens/AddBusPart';
import AddLorryPart from './Screens/AddLorryPart';
import AddOtherPart from './Screens/AddOtherPart';
import Checkout from './Screens/Checkout';
import Payment from './Screens/Payment';
import Garages from './Screens/Garages';
import SendGarage from './Screens/SendGarage';

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import cartReducer from './Store/reducers/cart';
import userReducer from './Store/reducers/user';
import productReducer from './Store/reducers/products';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  products: productReducer,
});

const store = createStore(rootReducer);

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function HomeStack(props) {
    //console.log('props', props);
    return (
      <Tab.Navigator

        screenOptions={({ }) => ({

          headerShown: false,
          tabBarActiveTintColor: '#41B93E',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: {
            backgroundColor: '#f8f8f8',
            borderTopWidth: 0,
            borderTopColor: '#eee',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 5,
          },

        })}

      >

        <Tab.Screen
          name="Home"
          children={() => <UserDashboard />}
          options={{
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color="black" />),
          }}
        />

        <Tab.Screen
          name="Garages"
          children={() => <Garages {...props} />}
          options={{
            tabBarIcon: () => (
              <MaterialIcons name="car-repair" size={30} color="black" />),
          }}
        />

        <Tab.Screen
          name="Parts"
          children={() => <PartsCatalogues {...props} />}
          options={{
            tabBarIcon: () => (
              <FontAwesome5 name="tools" size={24} color="black" />),
          }}
        />

        <Tab.Screen
          name="cart"
          children={() => <Cart {...props} />}
          options={{
            tabBarIcon: () => (
              <AntDesign name="shoppingcart" size={28} color="black" />),
          }}
        />

        <Tab.Screen
          name="profile"
          children={() => <Profile {...props} />}
          options={{
            tabBarIcon: () => (
              <AntDesign name="user" size={25} color="black" />),
          }}
        />

      </Tab.Navigator>

    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="homestack" component={HomeStack} />
          <Stack.Screen name="CarParts" component={CarParts} />
          <Stack.Screen name="MotorcycleParts" component={MotorcycleParts} />
          <Stack.Screen name="VanParts" component={VanParts} />
          <Stack.Screen name="BusParts" component={BusParts} />
          <Stack.Screen name="LorryParts" component={LorryParts} />
          <Stack.Screen name="OtherParts" component={OtherParts} />
          <Stack.Screen name="AddCarPart" component={AddCarPart} />
          <Stack.Screen name="AddMotorcyclePart" component={AddMotorcyclePart} />
          <Stack.Screen name="AddVanPart" component={AddVanPart} />
          <Stack.Screen name="AddBusPart" component={AddBusPart} />
          <Stack.Screen name="AddLorryPart" component={AddLorryPart} />
          <Stack.Screen name="AddOtherPart" component={AddOtherPart} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Payment" component={Payment}  />
          <Stack.Screen name="Garage" component={Garage}  />
          <Stack.Screen name="SendGarage" component={SendGarage}   />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </Provider>

  );

};