import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { ExternalLink } from "@/components/external-link";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { Fonts } from "@/constants/theme";
import useAuth from "@/hooks/auth-hook";

export default function TabTwoScreen() {
	const {

            data

          } = useAuth();
  return (
    <ThemedView style={styles.titleContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}
        >
          Name of Owner {data[0].name} and location is  {data[0].location}
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
