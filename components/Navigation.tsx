//React
import { useEffect } from "react";

//React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Navigation, create native stack navigator
const { Navigator, Screen } = createNativeStackNavigator<NavigationParamList>();

//Screens
import HomeScreen from "screens/HomeScreen";
import LoginScreen from "screens/LoginScreen";

//TS for Navigation stack
export type NavigationParamList = {
  Home: undefined;
  Login: undefined;
};

//Firebase Auth
//import { User } from "firebase/auth";

//Web auth session
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

//Secure Store
import * as SecureStore from "expo-secure-store";

//Redux
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { restoreToken } from "../store/authSlice";

export const Navigation = () => {
  //Redux
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: Show Loading.
    checkLocalUser();
  }, []);

  const checkLocalUser = async () => {
    let userToken;
    try {
      console.log("user CHECKED");
      userToken = await SecureStore.getItemAsync("userToken");
    } catch (error) {
      //TODO: usertoken failure.
      alert(error);
    }
    if (userToken) {
      //TODO: token restored, what happens on failure?
      dispatch(restoreToken(userToken));
    }
  };

  //Where is the user information stored? It should be in redux & async store?

  //Async storage should be used for presistant information
  //Redux should be updated if the presistant information is changed?
  //When logged in, the information should be persisted...

  return (
    <NavigationContainer>
      <Navigator>
        {auth.userToken ? (
          <>
            <Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
                animationTypeForReplace: auth.isSignout ? "pop" : "push",
              }}
            />
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
