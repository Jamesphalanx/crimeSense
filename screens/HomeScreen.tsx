//React Native
import { StyleSheet } from "react-native";
import { useEffect } from "react";

//Firebase auth
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

//UI Kitten
import { Button, Layout, Text } from "@ui-kitten/components";

//React Navigation Types
import { NavigationParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//Async
import AsyncStorage from "@react-native-async-storage/async-storage";

//Secure Store
import * as SecureStore from "expo-secure-store";

//Storage
import { db } from "../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { signOff } from "store/authSlice";
import { RootState } from "store/store";

//Navigator Prop
type HomeScreenProp = NativeStackScreenProps<NavigationParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProp) => {
  //Redux
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const navigateDetails = async () => {
    //Firebase signout
    await signOut(auth);
    //Remove from Secure store
    await SecureStore.deleteItemAsync("userToken");
    //Remvoe Asyncstore when logged off
    await AsyncStorage.removeItem("@user");
    //Redux signoff
    dispatch(signOff());
  };

  // useEffect(() => {
  //   const q = query(collection(db, "users"));
  //   const unsub = onSnapshot(q, (qs) => {
  //     qs.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });
  //   return () => unsub();
  // }, []);

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user && user.email && <Text category="h2">{user.email.toString()}</Text>}

      <Button onPress={navigateDetails}>Logout</Button>
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
