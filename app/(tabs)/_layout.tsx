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
            <MaterialIcons size={28} name="receipt" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="attendances"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="calendar-month" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="employees"
        options={{
          title: "Employees",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="person" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="schedules"
        options={{
          title: "Schedules",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="schedule" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="claims"
        options={{
          title: "Expense Claims",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="question-mark" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="advances"
        options={{
          title: "Cash Advances",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="question-mark" color={color} />
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
    </Tabs>
  );
};

export default Layout;
