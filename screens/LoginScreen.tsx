import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "App";
import { StackNavigationProp } from "@react-navigation/stack";

import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenProp = StackNavigationProp<RootStackParamList, "Login">;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation<LoginScreenProp>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigation.navigate("Home");
        //TODO: encrypt this data...
        await AsyncStorage.setItem("@user", JSON.stringify(user));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
      })
      .catch((error) => alert(error.message));
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "25671504046-sqr2l328ppcl3pfoorsdn195ov59rnrg.apps.googleusercontent.com",
    androidClientId:
      "25671504046-4hld6t2bovqpfmt3qrevthjkdr3rnp0k.apps.googleusercontent.com",
    webClientId:
      "25671504046-4gjldbg65h4vojd3at3be5qqf5mpkq7o.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token, access_token } = response.params;
      const credentials = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credentials);
    }
  }, [response]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        ></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </Pressable>
        <Pressable onPress={() => promptAsync()} style={styles.button}>
          <Text style={styles.buttonText}>Sign In with Google</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  inputContainer: { width: "80%" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
    fontFamily: "MontserratRegular",
  },
});
