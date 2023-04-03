import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "../../Screens/auth/LoginScreen";
import RegistrationScreen from "../../Screens/auth/RegistrationScreen";
import PostsScreen from "../../Screens/mainScreen/PostsScreen";
import CreateScreen from "../../Screens/mainScreen/CreateScreen";
import ProfileScreen from "../../Screens/mainScreen/ProfileScreen";
import Grid from "../BarImages/Grid";
import NewBtn from "../BarImages/NewBtn";
import UserBtn from "../BarImages/UserBtn";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/authSelectors";
import { Button } from "react-native";
import Header from "../Header/Header";
import LogOutBtn from "../LogOutBtn/LogOutBtn";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

const Routing = () => {
  const isAuth = useSelector(selectIsLoggedIn);
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator>
      <MainTab.Screen
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            const props = focused
              ? { stroke: "#FF6C00" }
              : { stroke: "#212121" };
            return <Grid {...props} />;
          },
          headerShown: false,
        }}
        name="PostsScreen"
        component={PostsScreen}
      />
      <MainTab.Screen
        options={{
          unmountOnBlur: true,
          tabBarIcon: ({ focused }) => {
            const props = focused
              ? { btnFill: "#FF0000" }
              : { btnFill: "#FF6C00" };
            return <NewBtn {...props} />;
          },
          tabBarShowLabel: false,
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            const props = focused
              ? { stroke: "#FF6C00" }
              : { stroke: "#212121" };
            return <UserBtn {...props} />;
          },
          tabBarShowLabel: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

export default Routing;
