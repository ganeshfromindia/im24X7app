import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useUser } from "@/store/auth-context";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const { getUserData, data } = useUser();
  let updated: any[];

  const [updatedData, setUpdatedData] = useState<any[]>();

  useEffect(() => {
    setUpdatedData(data);
  }, [isFocused]);

  return (
    <ThemedView style={styles.Container}>
      {updatedData && (
        <FlatList
          data={updatedData}
          renderItem={({ item }) => (
            <ThemedView style={styles.listContainer}>
              <ThemedText type="subtitle">{item.name}</ThemedText>
              <ThemedText type="subtitle">{item.location}</ThemedText>
              <ThemedText type="subtitle">{item.tag}</ThemedText>
            </ThemedView>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 35,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: "auto",
    marginVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
