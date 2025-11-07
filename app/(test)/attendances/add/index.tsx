import { getDb } from "@/utils/globals";
import { useRouter } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddPage = () => {
  const db = getDb();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text>Add Attendance</Text>
    </SafeAreaView>
  );
};

export default AddPage;
