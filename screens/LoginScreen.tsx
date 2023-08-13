//React
import { StyleSheet, SafeAreaView } from "react-native";
import { useEffect } from "react";

//React Navigation Types
import { NavigationParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//Auth
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

//Async
import AsyncStorage from "@react-native-async-storage/async-storage";

//Secure Storage
import * as SecureStore from "expo-secure-store";

//UI Kitten
import { Button, Layout, Icon, IconElement } from "@ui-kitten/components";

//Env Variables
import { OAUTHIOS, OAUTHAND, OAUTHWEB } from "@env";

//Redux
import { useDispatch } from "react-redux";
import { signIn } from "../store/authSlice";

//Async User Type
export type UserInfo = {
  //Retrieved from Google
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;

  //Saved from Application
  username?: string | null;
};

//Screen Prop Type
type LoginScreenProp = NativeStackScreenProps<NavigationParamList, "Login">;

const LoginScreen = ({ navigation }: LoginScreenProp) => {
  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        //Set token to secure store
        const curToken = await user.getIdToken();
        await SecureStore.setItemAsync("userToken", curToken);

        //Set to redux
        dispatch(signIn(curToken));

        //TODO: Additional user information should be retrieved from firebase?
        //If no user exists, we create some additional fields.

        //Save personal information to AsyncStore
        const curUser: UserInfo = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        await AsyncStorage.setItem("@user", JSON.stringify(curUser));

        //TODO: Saving user information to firebase storage
        //TODO: Create a temporary username
        //TODO: Add to Redux stores
      }
    });
    return () => unsubscribe();
  }, []);

  //Google Icon
  const GoogleIcon = (props: any): IconElement => (
    <Icon {...props} name="google" />
  );
  //Facebook Icon
  const FacebookIcon = (props: any): IconElement => (
    <Icon {...props} name="facebook" />
  );

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: OAUTHIOS,
    androidClientId: OAUTHAND,
    webClientId: OAUTHWEB,
  });

  useEffect(() => {
    if (response?.type == "success") {
      const { id_token, access_token } = response.params;
      const credentials = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credentials);
    }
  }, [response]);

  //TODO: Failed login messages
  //TODO: Attempted login tries
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button
          onPress={() => promptAsync()}
          size="small"
          accessoryLeft={GoogleIcon}
          style={styles.button}
        >
          Continue with Google
        </Button>
        <Button size="small" accessoryLeft={FacebookIcon} style={styles.button}>
          Continue with Facebook
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: { marginBottom: 12, minWidth: 220, justifyContent: "flex-start" },
});
