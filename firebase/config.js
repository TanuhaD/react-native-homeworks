import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBdl3uJPtYukOuPy4swS3B9IBrJUvv_eFU",
  authDomain: "blog-react-native-91b95.firebaseapp.com",
  projectId: "blog-react-native-91b95",
  storageBucket: "blog-react-native-91b95.appspot.com",
  messagingSenderId: "206652990003",
  appId: "1:206652990003:web:ab9b1fee5e0f6fd7eef946",
  measurementId: "G-PHQKSFRP56",
};

export const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
