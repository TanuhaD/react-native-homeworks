import React, { useState } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

const initialState = {
  title: "",
  map: "",
};

const CreateScreen = () => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    console.log("photo", photo);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        <View>
          <Image source={{ uri: photo }} />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={takePhoto}>
            <Text style={styles.text}>Загрузите фото</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.form}>
          <TextInput
            value={state.title}
            onChangeText={(value) => {}}
            placeholder="Название..."
            secureTextEntry={true}
            style={styles.input}
            onFocus={() => {}}
          />
          <TextInput
            value={state.map}
            onChangeText={(value) => {}}
            placeholder="Местность"
            secureTextEntry={true}
            style={styles.input}
            onFocus={() => {}}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btnForm}
            onPress={() => {}}
          >
            <Text style={styles.textBtn}>Опубликовать</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: 343,
    height: 240,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "BDBDBD",
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#ffffff",
    paddingTop: 32,
  },
  input: {
    height: 50,
    backgroundColor: "#F6F6F6",

    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    paddingLeft: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
  },
  btnForm: {
    borderRadius: 100,
    backgroundColor: "F6F6F6",
    height: 51,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "BDBDBD",
  },
});

export default CreateScreen;
