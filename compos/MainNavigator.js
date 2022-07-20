import React, {useContext} from "react";
import AppForm from "./AppForm";
import UserProfile from "./UserProfile";
import ImageUpload from "./ImageUpload";
import LoginForm from "./LoginForm";
import { createStackNavigator } from "@react-navigation/stack";
import {useLogin} from '../context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';




const Stack = createStackNavigator();


const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm"/>
      <Stack.Screen component={ImageUpload} name="ImageUpload" />
      <Stack.Screen component={UserProfile} name="UserProfile" />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const {isLoggedIn} = useLogin();
  return (isLoggedIn ? <DrawerNavigator/> : <StackNavigator/>);
};

export default MainNavigator;
