//React
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";

//Auth
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../../firebase";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  OAuthCredential,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  signInWithCredential,
  signInWithPopup,
} from "firebase/auth";

//UI Kitten
import { Button, Icon, IconElement } from "@ui-kitten/components";

//Env Variables
import { FBAPPID, OAUTHIOS, OAUTHAND, OAUTHWEB } from "@env";

const FacebookLogin = () => {
  //FB
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: FBAPPID,
  });

  useEffect(() => {
    //Response?
    //https://crimesense.firebaseapp.com/__/auth/handler
    if (response?.type == "success" && response.authentication) {
      const { accessToken } = response.authentication;
      const credentials = FacebookAuthProvider.credential(accessToken);
      signInWithCredential(auth, credentials).catch(async (error) => {
        try {
          //Check if it's account exists error, continue if not
          if (error.code != "auth/account-exists-with-different-credential") {
            throw error;
          }

          //TODO Later on... fucking stuck on this one..
          //How the hell do I link accounts? why isn't this bigger issues with all application? wtf

          //TODO: Error popup, email alrady registered, please login and link account
          //Ehhhhh, not really a good solution...
          //link, how does it happen?

          //GOOGLE
          //How the hell am I going to get the google creds?
          //Google promtAsync opens the google thing...

          //How to link Google and facebook if users have same email login...
          //1. tell em to login using google?
          //2. link accounts into one...

          //They need to login using google... and then link to facebook... lot of shit
          // await fetchSignInMethodsForEmail(auth, error.customData.email).then(
          //   (providers) => {
          //     //signInWithPopup(auth, provider);
          //     // provider.setCustomParameters({login_hint: error.email});
          //     // firebase.auth().signInWithPopup(provider)
          //   }
          // );
          // //Find the sign in using email
          // console.log("email", error.customData.email);
          // const method = await fetchSignInMethodsForEmail(
          //   auth,
          //   error.customData.email
          // );
          // const oldCred = await console.log("method", method);
          // //linkWithCredential(credentials)
        } catch (error) {
          throw error;
        }
      });
      // const credentials = GoogleAuthProvider.credential(id_token, access_token);
      // signInWithCredential(auth, credentials);
      // const test = FacebookAuthProvider.credential()(async () => {
      //   //
      //   const userInfoRes = await fetch(
      //     `https://graph.facebook.com/me?access_token=${fbRes.authentication?.accessToken}&fields=id,name,email`
      //   );
      //   const fbUserInfo = await userInfoRes.json();
      //   console.log(fbUserInfo);
      //   console.log(fbRes.authentication);
      // })();
      // // const { id_token, access_token } = fbRes.params;
      // const credentials = GoogleAuthProvider.credential(id_token, access_token);
      // signInWithCredential(auth, credentials);
    }
  }, [response]);

  //Facebook Icon
  const FacebookIcon = (props: any): IconElement => (
    <Icon {...props} name="facebook" />
  );

  return (
    <Button
      size="small"
      onPress={() => promptAsync()}
      accessoryLeft={FacebookIcon}
      style={styles.button}
    >
      Continue with Facebook
    </Button>
  );
};

export default FacebookLogin;

const styles = StyleSheet.create({
  button: { marginBottom: 12, minWidth: 220, justifyContent: "flex-start" },
});
