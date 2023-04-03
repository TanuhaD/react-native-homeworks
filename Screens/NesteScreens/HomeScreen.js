import React from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import Post from "../../components/Post/Post";
import { selectPosts } from "../../redux/posts/postsSelectors";

const HomeScreen = ({ navigation }) => {
  const postList = useSelector(selectPosts);
  console.log("postList", postList);
  return (
    <ScrollView style={{ marginHorizontal: 10 }}>
      {postList?.length > 0 &&
        postList.map(({ title, map, location, photo }) => {
          return (
            <Post
              key={location.timestamp}
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
