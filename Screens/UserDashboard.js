import React, { Component } from 'react'
import { Animated, View, StyleSheet, Image, Dimensions, ScrollView, Text } from 'react-native'

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
                <ScrollView
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
                    {/* <View
                        style={styles.skip}
                    >
                        <Text style={{
                            backgroundColor: '#fff', color: "#F44", textAlign: "center", alignItems: 'center',
                            justifyContent: 'center',
                        }}>skip</Text>
                    </View> */}
                </ScrollView>
                <View
                    style={styles.barContainer}
                >
                    {barArray}
                </View>
                <View>
                    <Text>
                        iuhit
                    </Text>
                </View>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 550
    },
    barContainer: {
        position: 'absolute',
        zIndex: 2,
        bottom: 40,
        flexDirection: 'row',
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