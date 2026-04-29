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
}
export default function TabTwoScreen() {
  const auth: UserDataType = useContext(AuthContext);

  console.log("data", auth.id);
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Name of Owner {auth.name} and location is {auth.location}
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
  },
});
