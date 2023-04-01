import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';

import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import UserDashboard from './Screens/UserDashboard';
import Profile from './Screens/Profile';
import Home from './Screens/Home';
import Cart from './Screens/Cart';
import Garage from './Screens/Garage';
import PartsCatalogues from './Screens/PartsCatalogues';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
//nonim

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function HomeStack(props) {
    console.log('props', props);
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
          name="Garage"
          children={() => <Garage {...props} />}
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

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="homestack" component={HomeStack} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>

  );

};