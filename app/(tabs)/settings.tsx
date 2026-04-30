import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AuthContext } from "@/store/auth-context";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
interface UserDataType {
  id: number;
  name: string;
  location: string;
  tag: string;
  postUserData: (
    id: number | null,
    name: string | null,
    location: string | null,
    tag: string | null,
  ) => void;
  getUserData: (
    id: number | null,
    name: string | null,
    location: string | null,
    tag: string | null,
  ) => void;
}
interface data {
  data: UserDataType;
}
export default function TabTwoScreen() {
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [updatedData, setUpdatedData] = useState<any[]>([]);
  const auth: data | any = useContext(AuthContext);
  let updated: any[];
  useEffect(() => {
    const getData = async () => {
      updated = await auth.getUserData();
      setUpdatedData(updated);
    };
    getData();
    return () => {};
  }, [auth]);
  const handleChangeNameLocation = () => {
    updatedData.map((data: any) =>
      auth.postUserData(data.id, userName, location, data.tag),
    );
  };
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={userName}
          onChangeText={(text) => setUserName(text)} // Updates state with every keystroke
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          value={location}
          onChangeText={(text) => setLocation(text)} // Updates state with every keystroke
        />
      </ThemedView>
      <ThemedView style={styles.container1}>
        <TouchableOpacity onPress={handleChangeNameLocation}>
          <ThemedText
            style={[styles.button, styles.submitButtonText, styles.container]}
          >
            Save
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
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
  },

  submitButtonText: {
    color: "#212121",
    cursor: "pointer",
    textDecorationLine: "none",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 17,
  },

  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
});
