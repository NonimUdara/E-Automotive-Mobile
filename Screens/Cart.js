import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const App = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHoverIn = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  return (
    <View
      style={styles.container}
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
    >
      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isHovered ? 'lightblue' : 'white' },
        ]}
        activeOpacity={0.8}
        onPress={() => console.log('Pressed!')}
      >
        <Text>{isHovered ? 'Hovered' : 'Not Hovered'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  button: {
    padding: 16,
    borderRadius: 8,
  },
});

export default App;
