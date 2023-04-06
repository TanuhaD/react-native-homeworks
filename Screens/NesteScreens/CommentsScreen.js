import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Text,
} from "react-native";
import { db } from "../../firebase/config";
import { selectUid } from "../../redux/auth/authSelectors";
import SendCommentSvg from "../../components/BarImages/SendCommentSvg/SendCommentSvg";
import { useSelector } from "react-redux";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { nanoid } from "@reduxjs/toolkit";

const CommentsScreen = ({ route }) => {
  const { id: postId, photo, title } = route.params;
  const [allcomments, setAllcomments] = useState([]);
  const [downloadComments, setDownloadComments] = useState(false);

  const [comment, setComment] = useState("");
  const uid = useSelector(selectUid);

  useEffect(() => {
    getDocs(
      collection(
        db,
        "posts",
        uid,
        "postCollection",
        postId,
        "commentCollection"
      )
    ).then((query) => {
      const array = [];
      query.forEach((comment) => {
        array.push({ ...comment.data(), id: comment.id });
      });
      setAllcomments(array);
    });
  }, [downloadComments]);

  const createComment = async () => {
    try {
      await setDoc(
        doc(
          db,
          "posts",
          uid,
          "postCollection",
          postId,
          "commentCollection",
          nanoid()
        ),
        {
          uid,
          comment,
        }
      );
      setComment("");
      setDownloadComments(!downloadComments);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    // <ScrollView style={{ marginHorizontal: 10 }}>
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image}></Image>
      <SafeAreaView style={styles.containerComment}>
        <FlatList
          data={allcomments}
          renderItem={({ item }) => (
            <View style={styles.wrappComment}>
              <Text>{item.name}</Text>
              <Text style={styles.textComment}>{item.comment}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
          // extraData={selectedId}
        />
      </SafeAreaView>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Комментировать..."
          onChangeText={setComment}
          value={comment}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={createComment}>
          <View>
            <SendCommentSvg style={styles.btnComment} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  image: {
    marginTop: 32,
    marginHorizontal: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    overflow: "hidden",

    height: 240,
  },
  wrappComment: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 100,
    paddingLeft: 10,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
  },
  textComment: {
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  form: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  input: {
    marginBottom: 16,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    height: 50,
    borderRadius: 100,
    marginHorizontal: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    marginBottom: 32,
  },
  btnComment: {
    position: "absolute",
    flex: 1,
    bottom: 41,
    left: 330,
  },
});

export default CommentsScreen;
