import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import LoginScreen from "../../Screens/auth/LoginScreen";
import RegistrationScreen from "../../Screens/auth/RegistrationScreen";
import CreateScreen from "../../Screens/mainScreen/CreateScreen";
import PostsScreen from "../../Screens/mainScreen/PostsScreen";
import ProfileScreen from "../../Screens/mainScreen/ProfileScreen";
import { app } from "../../firebase/config";
import { selectUid } from "../../redux/auth/authSelectors";
import { setUid, setUserData } from "../../redux/auth/authSlice";
import Grid from "../BarImages/Grid";
import NewBtn from "../BarImages/NewBtn";
import UserBtn from "../BarImages/UserBtn";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();
const auth = getAuth(app);

const Routing = () => {
  const isAuth = useSelector(selectUid);
  if (isAuth === "") {
    const dispatch = useDispatch();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { email, displayName, uid } = user;
        dispatch(setUserData({ email, uid, displayName }));
      } else {
        dispatch(setUid(null));
      }
    });
    return null;
  }
  if (isAuth === null) {
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
          unmountOnBlur: true,
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
