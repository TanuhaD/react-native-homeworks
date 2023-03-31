import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import Header from "../../components/Header/Header";
import LogOutBtn from "../../components/LogOutBtn/LogOutBtn";
import CommentsScreen from "../NesteScreens/CommentsScreen";
import HomeScreen from "../NesteScreens/HomeScreen";
import MapScreen from "../NesteScreens/MapScreen";

const PostsScreen = () => {
  const PostScreenStack = createNativeStackNavigator();
  return (
    <PostScreenStack.Navigator>
      <PostScreenStack.Screen
        options={{
          headerTitle: () => {
            return (
              <Header
                title="Публикации"
                contWrp={{ paddingRight: Platform.OS == "ios" ? 10 : 30 }}
              />
            );
          },
          headerTitleAlign: "center",
          headerRight: () => {
            return <LogOutBtn />;
          },
        }}
        name="Home"
        component={HomeScreen}
      />
      <PostScreenStack.Screen
        options={{
          headerTitle: () => {
            return (
              <Header
                title="Комментарии"
                contWrp={{ paddingRight: Platform.OS == "ios" ? 90 : 140 }}
              />
            );
          },
          headerTitleAlign: "center",
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <PostScreenStack.Screen
        options={{
          headerTitle: () => {
            return (
              <Header
                title="Карты"
                contWrp={{ paddingRight: Platform.OS == "ios" ? 100 : 140 }}
              />
            );
          },
          headerTitleAlign: "center",
        }}
        name="Maps"
        component={MapScreen}
      />
    </PostScreenStack.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;
