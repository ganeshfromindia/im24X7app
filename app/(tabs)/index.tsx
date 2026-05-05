import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useUser } from "@/store/auth-context";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState, useEffect, useLayoutEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useIsFocused } from '@react-navigation/native';

export default function HomeScreen() {
	const isFocused = useIsFocused();
  const { getUserData, data } = useUser();
  let updated: any[];

  const [updatedData, setUpdatedData] = useState<any[]>();

 useEffect(() => {

setUpdatedData(data)
//       getUserData().then((res: any) => {
// 		  console.log("res", res)
//         setUpdatedData(res);
//       })
  },[isFocused])



  //   useFocusEffect(
  //     useCallback(async () => {
  //     updated = await auth.getUserData();
  //     setUpdatedData(updated);
  //  },[auth]),);
  // const getContxtData = async () => {
  //   updated = await auth.getUserData();
  //   setUpdatedData(updated);
  // };
  // getContxtData();
  // useEffect(() => {
  //   const getData = async () => {
  //     updated = await auth.getUserData();
  //     setUpdatedData(updated);
  //   };
  //   getData();
  //   return () => {};
  // }, [auth]);

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
