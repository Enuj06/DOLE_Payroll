import { Href, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PositionsPage = () => {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity onPress={() => router.push("/positions/add" as Href)}>
        <Text>Add Position</Text>
      </TouchableOpacity>

      <Text>Positions</Text>
    </View>
  );
};

export default PositionsPage;
