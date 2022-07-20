import React, { useEffect, useRef } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import App from "../compos/todo/App";

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Dimensions,
  Animated,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

export function Home({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <App />
    </View>
  );
}
