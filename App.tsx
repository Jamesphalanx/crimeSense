//React
import { useCallback } from "react";
import { Platform, StyleSheet, View } from "react-native";

//Font + Splash
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

//UI Kitten
import * as eva from "@eva-design/eva";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { default as theme } from "theme.json";
import { default as mapping } from "./mapping.json";

//Status Bar
import { StatusBar } from "expo-status-bar";

//Navigation Component
import { Navigation } from "./components/Navigation";

//Expo
import Constants from "expo-constants";

//Redux
import { store } from "./store/store";
import { Provider } from "react-redux";

//Show Splash screen
SplashScreen.preventAutoHideAsync();

export default function App() {
  //Use Expo font import function
  const [fontsLoaded, fontError] = useFonts({
    MontserratRegular: require("./assets/fonts/Montserrat-Regular.otf"),
  });

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
    <Provider store={store}>
      <View style={styles.iosHeader}>
        <StatusBar
          style="light"
          translucent={true}
          backgroundColor={"transparent"}
        />
      </View>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{ ...eva.dark, ...theme }}
        customMapping={mapping}
      >
        <Layout onLayout={onLayoutRootView} style={styles.layout}>
          <Navigation />
        </Layout>
      </ApplicationProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  iosHeader: {
    paddingTop: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
    height: Platform.OS === "ios" ? Constants.statusBarHeight : 0,
    backgroundColor: "#1F1F1F",
  },
  layout: {
    flex: 1,
    flexDirection: "row",
  },
});
