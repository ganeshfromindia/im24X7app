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
import React, { useState } from "react";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
export default function TabTwoScreen() {
  const isDarkMode = useColorScheme() === "dark";
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [userName, setUserName] = useState("");
  const rnBiometrics = new ReactNativeBiometrics();
  const checkBiometrics = async () => {
    try {
      const { available, biometryType, error } =
        await rnBiometrics.isSensorAvailable();

      if (available && biometryType === BiometryTypes.TouchID) {
        console.log("TouchID is supported");
        //         Alert.alert("TouchID is supported", "TouchID is supported", [
        //           {
        //             text: "Cancel",
        //             onPress: () => console.log("Cancel Pressed"),
        //           },
        //         ]);
        return true;
      } else if (available && biometryType === BiometryTypes.FaceID) {
        console.log("FaceID is supported");
        //         Alert.alert("FaceID is supported", "FaceID is supported", [
        //           {
        //             text: "Cancel",
        //             onPress: () => console.log("Cancel Pressed"),
        //           },
        //         ]);
        return true;
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        //         Alert.alert("Biometrics  supported", "Biometrics  supported", [
        //           {
        //             text: "Cancel",
        //             onPress: () => console.log("Cancel Pressed"),
        //           },
        //         ]);
        console.log("Biometrics is supported");
        return true;
      } else {
        Alert.alert("Biometrics not supported", "Biometrics not supported", [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
          },
        ]);
        console.log("Biometrics not supported", error || "");
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
      console.error("Error checking biometrics available", err);
      return false;
    }
  };

  const handleBioMetricAuthentication = async () => {
    const payload = await sendRequest(
      `https://d6d0-60-254-0-230.ngrok-free.app/api/users/generatePayLoad`,
      "GET",
    );
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
    if (keysExist) {
      console.log("Keys exist");
    } else {
      console.log("Keys do not exist or were deleted");
    }

    if (!keysAlreadyExist) {
      const { publicKey } = await rnBiometrics.createKeys();
      keysAlreadyExist = publicKey;
      console.log(publicKey);
      const response = await sendRequest(
        `https://d6d0-60-254-0-230.ngrok-free.app/api/users/addPublicKey`,
        "POST",
        JSON.stringify({ publicKey: publicKey, userName: userName }),
        {
          "Content-Type": "application/json",
        },
      );
    }

    const { success, signature } = await rnBiometrics.createSignature({
      promptMessage: "Sign in",
      payload: payload.payloadId,
    });
    let response1;
    if (success) {
      console.log("test sign", signature);
      console.log("test payload", payload.payloadId);
      console.log("userName", userName);
      response1 = await sendRequest(
        `https://d6d0-60-254-0-230.ngrok-free.app/api/users/loginBiometrics`,
        "POST",
        JSON.stringify({
          signature: signature,
          payload: payload.payloadId,
          userName: userName,
        }),
        {
          "Content-Type": "application/json",
        },
      );
    }
    if (response1.success) {
      Alert.alert("Biometrics  Authentication Successful", "Authorized", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
      ]);
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
              style={[styles.button, styles.submitButtonText, styles.container]}
            >
              Bio Metric Authentication
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
      )}
    </ThemedView>
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
