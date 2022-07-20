import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
const FormHeader = ({
  leftHeading,
  rightHeading,
  subHeading,
  leftHeadingTranslateX,
  rightHeadingTranslateY,
  rightHeaderOpacity,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>{leftHeading}</Text>
        <Text style={styles.heading}>{rightHeading}</Text>
      </View>
      <Text style={styles.subHeading}>{subHeading}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginLeft: 20,
    alignItems: "center",
  },
  heading: { fontSize: 15, fontWeight: "bold", color: "#1b1b33" },
  subHeading: { fontSize: 16, color: "#1b1b33", textAlign: "center" },
});

export default FormHeader;

