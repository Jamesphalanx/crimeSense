//React
import { StyleSheet } from "react-native";
import { useEffect } from "react";

//React Navigation Types
import { NavigationParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//Auth
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

//Storage
import { db } from "../firebase";
import { query, collection, addDoc, where, getDocs } from "firebase/firestore";

//Async
import AsyncStorage from "@react-native-async-storage/async-storage";

//Secure Storage
import * as SecureStore from "expo-secure-store";

//UI Kitten
import { Layout } from "@ui-kitten/components";

//Redux
import { useDispatch } from "react-redux";
import { signIn } from "store/authSlice";
import { UserState, setUser } from "store/userSlice";

//Componenets
import GoogleLogin from "@/auth/GoogleLogin";
import FacebookLogin from "@/auth/FacebookLogin";

//Screen Prop Type
type LoginScreenProp = NativeStackScreenProps<NavigationParamList, "Login">;

const LoginScreen = ({ navigation }: LoginScreenProp) => {
  //Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        console.log("user", user);
        if (user) {
          //Set token to secure store
          const curToken = await user.getIdToken();
          await SecureStore.setItemAsync("userToken", curToken);

          //Set user token into to redux
          dispatch(signIn(curToken));

          //Check if users exists in user collection
          const searchUserQuery = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          );
          const userSnap = await getDocs(searchUserQuery);
          //Create user from pull
          const curUser: UserState = {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
          };

          //Check if user exists, save user to collection if not.
          if (userSnap.size === 0) {
            //TODO: creative Username generator
            curUser.username = "tempusername";
            //Save to users.
            //TODO: better error catching
            //TODO: success? what should we do?
            await addDoc(collection(db, "users"), curUser)
              .then((docRef) => {
                console.log("Document has been added successfully", docRef.id);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            userSnap.forEach((doc) => {
              const firebaseUser = doc.data();
              curUser.uid = firebaseUser.uid;
              curUser.name = firebaseUser.name;
              curUser.email = firebaseUser.email;
              curUser.username = firebaseUser.username;
              return false;
            });
          }

          //Set current logged in user to Async storage...
          //TODO: Do we need to do this? maybe when the app is loaded in differently? Not sure...
          await AsyncStorage.setItem("@user", JSON.stringify(curUser));

          //TODO: Add to Redux stores
          dispatch(setUser(curUser));
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, []);

  //TODO: Failed login messages
  //TODO: Attempted login tries
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GoogleLogin />
      <FacebookLogin />
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
