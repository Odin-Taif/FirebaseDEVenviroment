import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

export function SignOut() {
  const { user } = useAuthentication();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.container}>{user?.email}</Text>
        <Button
          title="Sign Out"
          style={{ marginTop: 10 }}
          onPress={() => signOut(auth)}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingTop:5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
