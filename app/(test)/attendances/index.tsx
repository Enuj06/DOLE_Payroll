import { getDb } from "@/utils/globals";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const IndexPage = () => {
  const db = getDb();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Attendances</Text>

        <TouchableOpacity
          onPress={() => router.navigate("attendances/add" as Href)}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default IndexPage;
