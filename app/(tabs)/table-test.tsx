import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TableTest = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <TouchableOpacity onPress={() => router.navigate("/test")}>
        <Text>Test</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TableTest;
