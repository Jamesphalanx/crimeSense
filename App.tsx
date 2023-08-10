import { useEffect, useState, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "screens/LoginScreen";
import HomeScreen from "screens/HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//TS for Navigation stack
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

//Show Splash screen
SplashScreen.preventAutoHideAsync();

//Create navigation stack
const Stack = createNativeStackNavigator<RootStackParamList>();

//Authentication
WebBrowser.maybeCompleteAuthSession();

export default function App() {
  //Use Expo font import function
  const [fontsLoaded, fontError] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.otf"),
  });
  const [userInfo, setUserInfo] = useState<User>();

  useEffect(() => {
    checkLocalUser();
  }, []);

  const checkLocalUser = async () => {
    try {
      const userJSON = await AsyncStorage.getItem("@user");
      const userData: User = userJSON ? JSON.parse(userJSON) : null;
      setUserInfo(userData);
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  //Create a callback for hiding splash screen on FONT LOAD.
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  //Return null until loaded
  //TODO: What if fonts can't be loaded?
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
