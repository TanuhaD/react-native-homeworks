import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import { db } from "../../firebase/config";
import { selectUid } from "../../redux/auth/authSelectors";

const HomeScreen = ({ navigation }) => {
  const [postList, setPostList] = useState([]);
  const uid = useSelector(selectUid);

  useEffect(() => {
    try {
      getDocs(collection(db, "posts", uid, "postCollection")).then(
        (querySnapshot) => {
          const arr = [];
          querySnapshot.forEach((post) => {
            arr.push({ ...post.data(), id: post.id });
          });
          setPostList(arr);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <ScrollView style={{ marginHorizontal: 10 }}>
      {postList?.length > 0 &&
        postList.map(({ title, map, location, photo, id }) => {
          return (
            <Post
              key={id}
              id={id}
              title={title}
              map={map}
              location={location}
              photo={photo}
              navigation={navigation}
            />
          );
        })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
