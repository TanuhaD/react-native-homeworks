import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CameraSvg from "../../components/CameraSvg/CameraSvg";
import { db } from "../../firebase/config";
import useKeyboard from "../../hooks/useKeyboard";
import { selectUid } from "../../redux/auth/authSelectors";
import { addNewPost } from "../../redux/posts/postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import AnimatedLoader from "react-native-animated-loader";

const initialState = {
  title: "",
  map: "",
};

const CreateScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const isKeyboardOpen = useKeyboard();
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const storage = getStorage();
  const uid = useSelector(selectUid);
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
  const publicNewPost = async () => {
    setVisible(true);
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      const docRef = doc(db, "posts", uid, "postCollection", nanoid());
      await setDoc(docRef, {
        ...state,
        location,
        photo: url,
      });
    } catch (error) {
      console.log(error.message);
    }
    dispatch(addNewPost({ ...state, photo, location }));
    setPhoto(null);
    setLocation(null);
    setState(initialState);
    setVisible(false);
    navigation.navigate("PostsScreen");
  };
  if (visible) {
    return (
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        speed={1}
      >
        <Text>Загружаем пост на сервер...</Text>
      </AnimatedLoader>
    );
  }

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
  lottie: {
    width: 100,
    height: 100,
  },
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
