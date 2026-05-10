import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useUser } from "@/store/auth-context";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  let { isLoggedIn } = useUser();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: true,
            tabBarButton: HapticTab,
          }}
        >
          <Tabs.Screen
            name="dashboard"
            options={{
              href: isLoggedIn ? "/dashboard" : null,
              title: "Dashboard",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="paperplane.fill" color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="settings"
            options={{
              href: isLoggedIn ? "/settings" : null,
              title: "Settings",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="gearshape" color={color} />
              ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              href: isLoggedIn ? "/profile" : null,
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={28} name="u.square" color={color} />
              ),
            }}
          />
        </Tabs>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
