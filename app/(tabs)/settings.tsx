import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useUser } from "@/store/auth-context";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";
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
  const isDarkMode = useColorScheme() === 'dark';
  const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");
  const [updatedData, setUpdatedData] = useState<any[]>([]);
  const { getUserData, postUserData } = useUser()
  let updated: any[];
  useEffect(() => {
    const getData = async () => {
      updated = await getUserData();
      setUpdatedData(updated);
    };
    getData();
    return () => {};
  }, []);
  const handleChangeNameLocation = () => {
    let dataToPost = updatedData.map((item, index) => ({
                                        ...item,
                                        id: index,
                                        name: userName,
                                        location: location
                                      }))
      postUserData(dataToPost)

  };
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.container}>
        <TextInput
         style={{
            color: isDarkMode ? 'white' : 'black',
            backgroundColor: isDarkMode ? '#222' : '#eee',
         }}
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
          placeholder="Enter your name"
          value={userName}
          onChangeText={(text) => setUserName(text)} // Updates state with every keystroke
        />
        <TextInput
         style={{
            color: isDarkMode ? 'white' : 'black',
            backgroundColor: isDarkMode ? '#222' : '#eee',
         }}
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
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
