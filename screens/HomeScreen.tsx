//React Native
import { StyleSheet, SafeAreaView } from "react-native";

//Firebase auth
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

//UI Kitten
import { Button, Layout } from "@ui-kitten/components";

//React Navigation Types
import { NavigationParamList } from "@/Navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//Async
import AsyncStorage from "@react-native-async-storage/async-storage";

//Secure Store
import * as SecureStore from "expo-secure-store";

//Redux
import { useDispatch } from "react-redux";
import { signOff } from "../store/authSlice";

//Navigator Prop
type HomeScreenProp = NativeStackScreenProps<NavigationParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProp) => {
  //Redux
  const dispatch = useDispatch();

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Button onPress={navigateDetails}>Logout</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
