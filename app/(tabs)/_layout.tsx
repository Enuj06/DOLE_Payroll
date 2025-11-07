import HapticTab from "@/components/HapticTab";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Payroll",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="payment" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Timesheets",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="browse-gallery" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="settings" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="test/test"
        options={{
          title: "Test",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="star" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
