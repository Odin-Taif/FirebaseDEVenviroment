import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FormHeader from "../compos/FormHeader";
import FormContainer from "../compos/FormContainer";
import FormInput from "../compos/FormInput";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validationMessage, setvalidationMessage] = useState("");

  async function login() {
    if (email === "" || password === "") {
      setvalidationMessage("required filled missing");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setvalidationMessage(error.message);
    }
  }

  return (
    <FormContainer>
          <FormInput
            placeholder="Email"
            style={styles.input}
            containerStyle={{ marginTop: 10 }}
            value={email}
            onChangeText={(text) => setEmail(text)}
            leftIcon={<Icon name="envelope" size={16} />}
          />

          <FormInput
            placeholder="Password"
            style={styles.input}
            containerStyle={{ marginTop: 10 }}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            leftIcon={<Icon name="key" size={16} />}
          />
          {<Text style={styles.error}>{validationMessage}</Text>}

          <Button
            title="Sign in"
            buttonStyle={{ marginTop: 10 }}
            onPress={login}
          />
          <Text style={{ marginTop: 5, fontSize: 17 }}>
            {" "}
            Don't have an account yet ?
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUp")}
              style={{ color: "blue", marginLeft: 10 }}
            >
              <Text>Sign up here</Text>
            </TouchableOpacity>
          </Text>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    bottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding:2, 
    height: 35,
    borderRadius: 2,
    fontSize: 18,
    paddingLeft: 1,
    marginBottom: 10,
  },
  error: {
    marginTop: 10,
    color: "red",
  },
});

export default SignInScreen;
