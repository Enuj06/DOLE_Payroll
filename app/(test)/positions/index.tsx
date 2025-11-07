import useFetch from "@/hooks/positions/useFetch";
import { getDb } from "@/utils/globals";
import { Href, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PositionsPage = () => {
  const db = getDb();
  const router = useRouter();

  const { positions } = useFetch(db);

  console.log(positions);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <Text>Positions</Text>

      <TouchableOpacity onPress={() => router.push("positions/add" as Href)}>
        <Text>Add</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PositionsPage;
