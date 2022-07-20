import { useState } from "react";
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
import FormContainer from "../compos/FormContainer";
import FormInput from "../compos/FormInput";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  let validateAndSet = (value, setValue) => {
    setValue(value);
  };
  function checkPassword(firstpassword, secondpassword) {
    if (firstpassword !== secondpassword) {
      setValidationMessage("Password do not match");
    } else setValidationMessage("");
  }
  async function createAccount() {
    email === "" || password === ""
      ? setValidationMessage("required filled missing")
      : "";
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate("Sign In");
    } catch (error) {
      setValidationMessage(error.message);
    }
  }
  return (
    <FormContainer>
      <FormInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        leftIcon={<Icon name="envelope" size={16} />}
      />
      <FormInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(value) => validateAndSet(value, setPassword)}
        secureTextEntry
        leftIcon={<Icon name="key" size={16} />}
      />
      <FormInput
        placeholder="confirm password"
        style={styles.input}
        value={confirmPassword}
        onChangeText={(value) => validateAndSet(value, setConfirmPassword)}
        secureTextEntry
        leftIcon={<Icon name="key" size={16} />}
        onBlur={() => checkPassword(password, confirmPassword)}
      />
      {<Text style={styles.error}>{validationMessage}</Text>}
      <Button
        title="Sign up"
        buttonStyle={{ marginTop: 10 }}
        onPress={createAccount}
      />
      <View>
        <Text style={{ marginTop: 5, fontSize: 17 }}>
          Already have an account?
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={{ color: "blue", marginLeft: 10 }}
          >
            <Text>Login here </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    bottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 2,
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

export default SignUpScreen;
