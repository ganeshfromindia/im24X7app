import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Fonts } from "@/constants/theme";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";

import { AuthContext } from "@/store/auth-context";
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
  data: UserDataType[];
}
export default function TabTwoScreen() {
  const auth: data = useContext(AuthContext);

  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
            fontSize: 25,
            marginHorizontal: 5,
            textAlign: "center",
          }}
        >
          Name of Owner {auth.data[0].name} and location is{" "}
          {auth.data[0].location}
        </ThemedText>
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
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 20,
  },
});
