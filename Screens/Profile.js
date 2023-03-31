// import React from "react";
// import { StyleSheet, Text, View } from 'react-native';


// const Profile = ({route}) => {
//     const {params: user} = route;
//     console.log("Profile", route);
//     return (
//         <View style={styles.mainView}>
//             <View style={styles.BottomView}>
//                 <Text style={styles.Heading}>
//                     E-Automotive
//                 </Text>
//                 <Text numberOfLines={1} style={styles.line}>
//                     ___________________________________
//                 </Text>
//                 <Text style={styles.Heading2}>
//                     Hello {user.name}
//                 </Text>
//                 <View style={styles.FormView}>
//                     <View style={styles.Button}>
//                         <Text style={styles.ButtonText}>
//                            {user.name}
//                         </Text>
//                     </View>

//                     <View style={styles.Button}>
//                         <Text style={styles.ButtonText}>
//                             {user.email}
//                         </Text>
//                     </View>
//                     <View style={styles.Button}>
//                         <Text style={styles.ButtonText}>
//                             {user.phone}
//                         </Text>
//                     </View>  
//                 </View>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     mainView: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     BottomView: {
//         width: '100%',
//         height: '100%',
//         backgroundColor: '#fff'
//     },
//     Heading: {
//         color: '#41B93E',
//         fontSize: 30,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginTop: 10,
//     },
//     Heading2: {
//         color: '#000',
//         fontSize: 28,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 10,
//         fontStyle: 'italic',
//     },
//     line: {
//         textAlign: 'center',
//         marginTop: -10,
//         color: '#000',
//         marginBottom: 30
//     },
//     FormView: {
//         width: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     Button: {
//         width: '90%',
//         color: '#fff',
//         height: 52,
//         backgroundColor: '#41B93E',
//         borderRadius: 15,
//         marginTop: 20,
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     ButtonText: {
//         fontWeight: 'bold',
//         fontSize: 18,
//         color: '#fff'
//     }
// })


// export default Profile;

import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const Profile = ({route}) => {

    const {params: user} = route;
    console.log("Profile", route);

    return (
        <View style={styles.container}>
            <View style={styles.header}></View>
            <Image
                style={styles.avatar}
                source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }}
            />
            <View style={styles.body}>
                <View style={styles.nameview}>
                    <Text style={styles.name}>{user.name}</Text>
                </View>
                <View style={styles.bodyContent}>
                    <View style={styles.bodyview}>
                        <MaterialIcons name="email" size={24} color="black" />
                        <Text style={styles.text2}>{user.name}</Text>
                    </View>
                    <View style={styles.bodyview}>
                        <AntDesign name="phone" size={24} color="black" />
                        <Text style={styles.text2}>Opcion 2</Text>
                    </View>
                    <View style={styles.bodyview}>
                        <Entypo name="address" size={24} color="black" />
                        <Text style={styles.text2}>Opcion 2</Text>
                    </View>
                    <View style={styles.bodyview}>
                        <Entypo name="location-pin" size={24} color="black" />
                        <Text style={styles.text2}>Opcion 2</Text>
                    </View>
                    <View style={styles.bodyview}>
                        <TextInput
                            placeholder={"Add your Address"}
                            placeholderTextColor={"#a1a1a1"}
                            style={styles.TextInput}
                        />
                        <TouchableOpacity style={styles.Button} >
                            <Text style={styles.ButtonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bodyview}>
                        <TextInput
                            placeholder={"Add your Postal Code"}
                            placeholderTextColor={"#a1a1a1"}
                            style={styles.TextInput}
                        />
                        <TouchableOpacity style={styles.Button} >
                            <Text style={styles.ButtonText}>
                                Add
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#41B93E',
        height: 100,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 30,
    },
    body: {
        marginTop: 40,
       // marginRight: 60
    },
    bodyContent: {
        flex: 1,
        //alignItems: 'center',
        padding: 20,
        marginRight: 150
    },
    bodyview: {
        marginTop: 20,
        height: 25,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 40,
    },
    text2: {
        marginLeft: 40
    },
    nameview: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 30,
        fontStyle: 'italic'
    },
    TextInput: {
        width: '120%',
        borderWidth: 1,
        borderColor: '#F3F3F3',
        height: 40,
        borderRadius: 10,
        paddingLeft: 10,
        marginLeft: 120,
        marginTop: 20,
        color: '#000',
        backgroundColor: 'white'
    },
    Button: {
        width: '50%',
        color: '#fff',
        height: 40,
        backgroundColor: '#41B93E',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Profile;