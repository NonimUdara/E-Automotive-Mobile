import React, { Component, useState } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, ImageBackground, Text, TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const deviceWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

const images = [
    require('../assets/images/Welcome.jpg'),
    require('../assets/images/Discount.jpg'),
    require('../assets/images/Sale.jpg'),
    require('../assets/images/Feedback.jpg'),
]

export default class App extends Component {

    numItems = images.length
    itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
    animVal = new Animated.Value(0)

    componentDidMount() {
        // Set the interval to move to the next image every 3 seconds
        this.interval = setInterval(() => {
            let scrollValue = this.animVal._value + deviceWidth
            if (scrollValue >= deviceWidth * (this.numItems - 1)) {
                scrollValue = 0
            }
            this.scrollView.scrollTo({ x: scrollValue, y: 0, animated: true })
        }, 3000)
    }

    componentWillUnmount() {
        // Clear the interval when the component unmounts
        clearInterval(this.interval)
    }

    render() {
        let imageArray = []
        let barArray = []
        images.forEach((image, i) => {
            const thisImage = (
                <Image
                    key={`image${i}`}
                    source={image}
                    style={{ width: deviceWidth, height: 200, alignItems: 'center' }}
                />
            )
            imageArray.push(thisImage)

            const scrollBarVal = this.animVal.interpolate({
                inputRange: [deviceWidth * (i - 1), deviceWidth * (i + 1)],
                outputRange: [-this.itemWidth, this.itemWidth],
                extrapolate: 'clamp',
            })

            const thisBar = (
                <View
                    key={`bar${i}`}
                    style={[
                        styles.track,
                        {
                            width: this.itemWidth,
                            marginLeft: i === 0 ? 0 : BAR_SPACE,
                        },
                    ]}
                >
                    <Animated.View
                        key={''}
                        style={[
                            styles.bar,
                            {
                                width: this.itemWidth,
                                transform: [
                                    { translateX: scrollBarVal },
                                ],
                            },
                        ]}
                    />
                </View>
            )
            barArray.push(thisBar)
        })

        return (
            <View
                style={styles.container}
                flex={1}
            >
                <ScrollView style={{}}>
                    <ScrollView
                        key={''}
                        ref={(scrollView) => { this.scrollView = scrollView }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={10}
                        pagingEnabled
                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { x: this.animVal } } }],
                                { useNativeDriver: false }
                            )
                        }
                    >

                        {imageArray}

                    </ScrollView>


                    <View
                        style={styles.barContainer}
                    >
                        {barArray}
                    </View>

                    <View>
                        <Text style={{ marginTop: 20, textAlign: 'center', fontWeight: 'bold', fontSize: 20, fontStyle: 'italic' }}>
                            Hello Parts Trader
                        </Text>
                    </View>

                    <View>
                        <Text style={{ marginTop: 0, textAlign: 'center', padding: 15 }}>
                            Welcome to the e-Automotive app, your one-stop destination for all things related to automobiles.
                        </Text>
                    </View>

                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, fontStyle: 'italic' }}>
                        You can Buy or Sell below Categories
                    </Text>

                    <View style={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 50 }} >
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 80, height: 70 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <ImageBackground source={require('../assets/images/Car.jpg')} style={{ width: 120, height: 90, alignContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                                        <Text style={{ fontSize: 12, color: '#3d423c', fontWeight: 'bold', marginTop: 70, fontStyle: 'italic' }}>Car Accessories</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 80, height: 70, marginLeft: 50 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <ImageBackground source={require('../assets/images/Motorcycle.jpg')} style={{ width: 120, height: 90, alignContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                                        <Text style={{ fontSize: 12, color: '#3d423c', fontWeight: 'bold', marginTop: 70, fontStyle: 'italic' }}>Bike Accessories</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 80, height: 70, marginLeft: 50 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <ImageBackground source={require('../assets/images/Van.jpg')} style={{ width: 120, height: 90, alignContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                                        <Text style={{ fontSize: 12, color: '#3d423c', fontWeight: 'bold', marginTop: 70, fontStyle: 'italic' }}>Van Accessories</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: 30 }}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 50 }} >
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 80, height: 70 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <ImageBackground source={require('../assets/images/Bus.jpg')} style={{ width: 120, height: 90, alignContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                                        <Text style={{ fontSize: 12, color: '#3d423c', fontWeight: 'bold', marginTop: 70, fontStyle: 'italic' }}>Bus Accessories</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 80, height: 70, marginLeft: 50 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <ImageBackground source={require('../assets/images/Lorry.jpg')} style={{ width: 120, height: 90, alignContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                                        <Text style={{ fontSize: 12, color: '#3d423c', fontWeight: 'bold', marginTop: 70, fontStyle: 'italic' }}>Lorry Accessories</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 80, height: 70, marginLeft: 50 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <ImageBackground source={require('../assets/images/Other.jpg')} style={{ width: 120, height: 90, alignContent: 'center', alignItems: 'center', textAlign: 'center' }} >
                                        <Text style={{ fontSize: 12, color: '#3d423c', fontWeight: 'bold', marginTop: 70, fontStyle: 'italic' }}>Other Accessories</Text>
                                    </ImageBackground>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, fontStyle: 'italic', marginTop: 40 }}>
                            Below are the other features of us!
                        </Text>
                    </View>

                    <View style={{ alignContent: 'center', alignItems: 'center', textAlign: 'center', marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', textAlign: 'center', borderRadius: 50 }} >
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 50, height: 70 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <AntDesign name="shoppingcart" size={40} color="black" />
                                    <Text>Garage</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 50, height: 70, marginLeft: 50 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <MaterialIcons name="car-repair" size={40} color="black" />
                                    <Text>Garage</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Button pressed!')} style={{ width: 70, height: 70, marginLeft: 50 }} >
                                <View style={{ alignItems: 'center' }}>
                                    <Ionicons name="call" size={40} color="black" />
                                    <Text>Contact us</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ alignItems: 'center', marginTop: 20 }}>
                            <FontAwesome5 name="facebook" size={35} color="#4267B2" onPress={() => Linking.openURL('https://web.facebook.com')} />{"       "}
                            <AntDesign name="twitter" size={35} color="#1DA1F2" onPress={() => Linking.openURL('https://twitter.com')} />{"     "}
                            <AntDesign name="instagram" size={35} color="#C13584" onPress={() => Linking.openURL('https://instagram.com')} />{"     "}
                        </Text>
                    </View>

                </ScrollView>
            </View>


        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 0
    },
    barContainer: {
        //position: 'absolute',
        //zIndex: 2,
        bottom: 20,
        // left:100,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        textAlign: 'center'
    },
    skip: {
        position: 'absolute',
        zIndex: 2,
        bottom: 80,
        flexDirection: 'row',
    },
    track: {
        backgroundColor: '#ccc',
        overflow: 'hidden',
        height: 2,
    },
    bar: {
        backgroundColor: '#5294d6',
        height: 2,
        position: 'absolute',
        left: 0,
        top: 0,
    },
})