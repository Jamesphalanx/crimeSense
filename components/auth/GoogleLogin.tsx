//React
import { StyleSheet } from "react-native";
import { useEffect } from "react";

//Auth
import * as Google from "expo-auth-session/providers/google";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

//UI Kitten
import { Button, Icon, IconElement } from "@ui-kitten/components";

//Env Variables
import { OAUTHIOS, OAUTHAND, OAUTHWEB } from "@env";

const GoogleLogin = () => {
  //Google Icon
  const GoogleIcon = (props: any): IconElement => (
    <Icon {...props} name="google" />
  );

  //GOOGLE
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: OAUTHIOS,
    androidClientId: OAUTHAND,
    webClientId: OAUTHWEB,
  });
  useEffect(() => {
    if (response?.type == "success") {
      const { id_token, access_token } = response.params;
      const credentials = GoogleAuthProvider.credential(id_token, access_token);
      signInWithCredential(auth, credentials).catch(async (error) => {
        //TODO Error for cred
      });
    }
  }, [response]);

  return (
    <Button
      onPress={() => promptAsync()}
      size="small"
      accessoryLeft={GoogleIcon}
      style={styles.button}
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  button: { marginBottom: 12, minWidth: 220, justifyContent: "flex-start" },
});
