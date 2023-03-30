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
import Error from './Screens/Error';
import ex from './Screens/ex';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//nonim

export default function App() {

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function HomeStack(props) {
    console.log('props', props);
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >

        <Tab.Screen
          name="Home"
          children={() => <UserDashboard {...props} />}
          options={{
            tabBarIcon: () => (
              <AntDesign name="home" size={24} color="black" />),
          }}
        />

        <Tab.Screen
          name="profile"
          children={() => <Profile {...props} />}
          options={{
            tabBarIcon: () => (
              <AntDesign name="user" size={24} color="black" />),
          }}
        />

        <Tab.Screen
          name="cart"
          children={() => <Cart {...props} />}
          options={{
            tabBarIcon: () => (
              <AntDesign name="shoppingcart" size={24} color="black" />),
          }}
        />

        <Tab.Screen
          name="garage"
          children={() => <Garage {...props} />}
          options={{
            tabBarIcon: () => (
              <MaterialCommunityIcons name="garage" size={36} color="black" />),
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
        <Stack.Screen name="Error" component={Error} />
        <Stack.Screen name="homestack" component={HomeStack} />
        <Stack.Screen name="ex" component={ex}/>
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
    
  );

};