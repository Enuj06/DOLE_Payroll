import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ClaimsPage = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Cash Advances</Text>

        <TouchableOpacity onPress={() => router.navigate("/claims/add")}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4"></View>
    </SafeAreaView>
  );
};

export default ClaimsPage;
