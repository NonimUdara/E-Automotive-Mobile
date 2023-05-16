import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImagePicker1 = (props) => {
  const [pickerResult, setPickerResult] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const _pickImg = async () => {
    let pickerResult1 = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      allowsEditing: false,
      aspect: [4, 3],
    });

    setPickerResult({
      pickerResult1,
    });

    setImageUri(pickerResult1 ? `data:image/jpg;base64,${pickerResult1.assets[0].base64}` : null)
    props.getImageData(pickerResult1)
  };

  return (
    <View style={styles.container}>
      {/* <Button style={{ color: 'red' }} onPress={_pickImg} title="Pick a profile Picture"  /> */}
      <TouchableOpacity style={styles.Button} onPress={_pickImg}>
        <Text style={styles.ButtonText}>
          Choose a Picture
        </Text>
      </TouchableOpacity>
      {pickerResult
        ? <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, margin: 10 }}
        />
        : null}
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  ButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#fff'
  },
  Button: {
    width: 200,
    color: '#fff',
    height: 42,
    backgroundColor: '#11A9FF',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#41B93E',
  },
});

export default ImagePicker1;

