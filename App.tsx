//WEB 25671504046-4gjldbg65h4vojd3at3be5qqf5mpkq7o.apps.googleusercontent.com
//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

//IOS 25671504046-sqr2l328ppcl3pfoorsdn195ov59rnrg.apps.googleusercontent.com

//android Not available
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [userInfo, setUserInfo] = React.useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:
      "25671504046-sqr2l328ppcl3pfoorsdn195ov59rnrg.apps.googleusercontent.com",
    webClientId:
      "25671504046-4gjldbg65h4vojd3at3be5qqf5mpkq7o.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);

  async function handleSignInWithGoogle() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication?.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (token: string | undefined) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Text>
        Open up App.tsx to start working on your app!
        {JSON.stringify(userInfo, null, 2)}
      </Text>
      <Button
        title="sign in with google"
        onPress={() => promptAsync()}
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
