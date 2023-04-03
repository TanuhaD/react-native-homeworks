import React, { useState, useEffect } from "react";
import { Camera, CameraType } from "expo-camera";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Keyboard,
} from "react-native";
import useKeyboard from "../../hooks/useKeyboard";
import CameraSvg from "../../components/CameraSvg/CameraSvg";
import * as Location from "expo-location";
import { addNewPost } from "../../redux/posts/postsSlice";
import { useDispatch } from "react-redux";

const initialState = {
  title: "",
  map: "",
};

const CreateScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const isKeyboardOpen = useKeyboard();
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const { statusLocation } =
        await Location.requestForegroundPermissionsAsync();

      // await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  const keyboardHide = () => {
    console.log("keyboard hide");
    Keyboard.dismiss();
  };
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync();
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: location.timestamp,
    });
  };
  const publicNewPost = () => {
    console.log("public post");
    dispatch(addNewPost({ ...state, photo, location }));
    setPhoto(null);
    setLocation(null);
    setState(initialState);
    navigation.navigate("PostsScreen");
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.wrapper}
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.cameraWrapper}>
            {hasPermission ? (
              <Camera style={styles.camera} ref={setCamera}>
                {photo && (
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: photo }} style={styles.image} />
                  </View>
                )}

                <View style={styles.btnContainerSvg}>
                  <TouchableOpacity style={styles.btnSvg} onPress={takePhoto}>
                    <CameraSvg />
                  </TouchableOpacity>
                </View>
              </Camera>
            ) : (
              <View style={styles.camera}>
                <Text>Allow access to camera to make a post</Text>
              </View>
            )}
          </View>
          <View style={styles.buttonLoading}>
            <TouchableOpacity>
              <Text style={styles.text}>Загрузите фото</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.form,
              width,
              paddingBottom: isKeyboardOpen ? 255 : 110,
            }}
          >
            <TextInput
              value={state.title}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, title: value }))
              }
              placeholder="Название..."
              style={styles.input}
            />
            <TextInput
              value={state.map}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, map: value }))
              }
              placeholder="Местность"
              style={styles.input}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginTop: 32 }}
              onPress={
                photo && location && state.title && state.map
                  ? () => {
                      console.log("first function");
                      publicNewPost();
                    }
                  : () => {
                      console.log("empty function");
                    }
              }
            >
              <View
                style={{
                  ...styles.btnForm,
                  backgroundColor:
                    photo && location && state.title && state.map
                      ? "#FF6C00"
                      : "#F6F6F6",
                }}
              >
                <Text style={styles.textBtn}>Опубликовать</Text>
              </View>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    flex: 1,
  },
  cameraWrapper: {
    marginTop: 32,
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  camera: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    width: "100%",
    height: 240,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    width: "100%",
  },
  image: {
    // borderWidth: 1,
    // borderColor: "#E8E8E8",
    width: "100%",
    height: 240,
  },
  btnContainerSvg: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  textSvg: {
    color: "#ffffff",
  },
  buttonLoading: {
    marginTop: 8,
    marginHorizontal: 10,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  text: {
    fontFamily: "Roboto-Regular",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  wrapper: {
    flex: 1,

    justifyContent: "center",
  },
  form: {
    backgroundColor: "#ffffff",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#ffffff",
    height: 50,

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
    color: "#BDBDBD",
  },
});

export default CreateScreen;
