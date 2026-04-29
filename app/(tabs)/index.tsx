import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { AuthContext } from "@/store/auth-context";
import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";
export default function HomeScreen() {
  const auth = useContext(AuthContext);
  let data: any[] = [];
  data.length = 250;
  let dataObj = { id: 1, name: "Harsh", location: "India", tag: "Developer" };
  data.fill(dataObj, 0, 250);
  const updatedData: any[] = data.map((item, index) => ({
    ...item,
    id: index,
    name: item.name + " " + (index + 1),
  }));
  updatedData.forEach((data: any) =>
    auth.userData(data.id, data.name, data.location, data.tag),
  );
  return (
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
  );
}

const styles = StyleSheet.create({
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
