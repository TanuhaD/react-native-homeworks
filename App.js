import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/images/photoBG.png")}
        style={styles.image}
      >
        <Text style={styles.text}>It is my first app!!!</Text>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 40,
  },
});
