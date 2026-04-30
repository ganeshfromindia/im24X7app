import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
          }}
        >
          <Tabs.Screen
            name="login"
            options={{
              title: "Login",
              tabBarIcon: ({ color }) => (
                <IconSymbol
                  size={28}
                  name="gearshape.circle.fill"
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="house.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarIcon: ({ color }) => (
                <IconSymbol
                  size={28}
                  name="gearshape.circle.fill"
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="ant.circle.fill" color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
