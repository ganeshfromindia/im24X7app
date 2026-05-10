import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import useHttpClient from "@/hooks/http-hook";
import { useUser } from "@/store/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";

export default function TabTwoScreen() {
  const { login } = useUser();
  const isDarkMode = useColorScheme() === "dark";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userName, setUserName] = useState("");
  const rnBiometrics = new ReactNativeBiometrics();
  const router = useRouter();
  const checkBiometrics = async () => {
    try {
      const { available, biometryType, error } =
        await rnBiometrics.isSensorAvailable();

      if (available && biometryType === BiometryTypes.TouchID) {
        // Alert.alert("TouchID is supported", "TouchID is supported", [
        //   {
        //     text: "Cancel",
        //     onPress: () => console.log("Cancel Pressed"),
        //   },
        // ]);
        return true;
      } else if (available && biometryType === BiometryTypes.FaceID) {
        // Alert.alert("FaceID is supported", "FaceID is supported", [
        //   {
        //     text: "Cancel",
        //     onPress: () => console.log("Cancel Pressed"),
        //   },
        // ]);
        return true;
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        // Alert.alert("Biometrics  supported", "Biometrics  supported", [
        //   {
        //     text: "Cancel",
        //     onPress: () => console.log("Cancel Pressed"),
        //   },
        // ]);

        return true;
      } else {
        Alert.alert("Biometrics not supported", "Biometrics not supported", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
        ]);

        return false;
      }
    } catch (err) {
      Alert.alert(
        "Error checking biometrics available",
        "Error checking biometrics available",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
        ],
      );

      return false;
    }
  };

  const handleBioMetricAuthentication = async () => {
    let payload: any;
    try {
      payload = await sendRequest(
        `https://1aa1-115-98-232-125.ngrok-free.app/api/users/generatePayLoad`,
        "GET",
      ).catch((err: any) => {
        Alert.alert(
          "Error during payload generation",
          "Error during payload generation, please try again",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
          ],
        );

        return;
      });
    } catch (err: any) {
      Alert.alert(
        "Error generating payload",
        "Error generating payload, please try again",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
        ],
      );

      return;
    }

    let keysAlreadyExist: any;
    let isBioMetricAvailable = await checkBiometrics();
    if (!isBioMetricAvailable) {
      return;
    }

    const deleteKeys = async () => {
      const { keysDeleted } = await rnBiometrics.deleteKeys();
    };
    await deleteKeys();
    const { keysExist } = await rnBiometrics.biometricKeysExist();
    keysAlreadyExist = keysExist;

    if (!keysAlreadyExist) {
      const { publicKey } = await rnBiometrics.createKeys();
      keysAlreadyExist = publicKey;

      try {
        const response = await sendRequest(
          `https://1aa1-115-98-232-125.ngrok-free.app/api/users/addPublicKey`,
          "POST",
          JSON.stringify({ publicKey: publicKey, userName: userName }),
          {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        ).catch((err: any) => {
          Alert.alert(
            "Error during adding public key",
            "Error during adding public key, please try again",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
              },
            ],
          );

          return;
        });
      } catch (err: any) {
        Alert.alert(
          "Error adding public key",
          "Error adding public key, please try again",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
          ],
        );

        await deleteKeys();
        return;
      }
    }

    payload.payloadId = payload.payloadId.replace(/-/g, "");
    const { success, signature } = await rnBiometrics.createSignature({
      promptMessage: "Sign in",
      payload: payload.payloadId,
    });
    let response1;
    if (success) {
      response1 = await sendRequest(
        `https://1aa1-115-98-232-125.ngrok-free.app/api/users/loginBiometrics`,
        "POST",
        JSON.stringify({
          signature: signature,
          payload: payload.payloadId,
          userName: userName,
        }),
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      ).catch((err: any) => {
        Alert.alert(
          "Error during authentication",
          "Error during authentication, please try again",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
            },
          ],
        );

        return;
      });
    }

    if (response1 && response1.success) {
      Alert.alert("Biometrics  Authentication Successful", "Authorized", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
      ]);
      await login();
      router.replace("/dashboard");
    } else {
      Alert.alert("Biometrics  Authentication Failed", "Please try again", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
      ]);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={styles.titleContainer}>
          <ThemedView style={styles.container}>
            <TextInput
              style={{
                padding: 10,
                color: isDarkMode ? "white" : "black",
                backgroundColor: isDarkMode ? "#222" : "#eee",
              }}
              placeholderTextColor={isDarkMode ? "#aaa" : "#666"}
              placeholder="Enter your name"
              value={userName}
              onChangeText={(text) => setUserName(text)} // Updates state with every keystroke
            />
          </ThemedView>
          {userName && (
            <ThemedView style={styles.container1}>
              <TouchableOpacity onPress={handleBioMetricAuthentication}>
                <ThemedText
                  style={[
                    styles.button,
                    styles.submitButtonText,
                    styles.container,
                  ]}
                >
                  Bio Metric Authentication
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </ThemedView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  input: { height: 40, borderBottomWidth: 1, marginBottom: 20 },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 10,
    marginVertical: 20,
  },
  container1: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: "auto",
    marginVertical: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },

  submitButtonText: {
    cursor: "pointer",
    textDecorationLine: "none",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 17,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
