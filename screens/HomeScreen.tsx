import { StyleSheet, Text, Pressable, View } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const HomeScreen = () => {
  return (
    <View>
      <Text>Home Screen</Text>
      <Pressable onPress={async () => await signOut(auth)}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
