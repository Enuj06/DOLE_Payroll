import DeleteAlert from "@/components/DeleteAlert";
import useDelete from "@/hooks/advances/useDelete";
import useFetchAll from "@/hooks/advances/useFetchAll";
import { getDate, getDb } from "@/utils/globals";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AdvancesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { advances, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Cash Advances</Text>

        <TouchableOpacity onPress={() => router.navigate("/advances/add")}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <FlatList
          data={advances}
          keyExtractor={(advance) => `${advance.id}`}
          renderItem={({ item: advance }) => (
            <View className="flex-row gap-4">
              <View>
                <Text>{getDate(new Date(advance.date))}</Text>
              </View>

              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() =>
                    router.navigate({
                      pathname: "/advances/edit/[id]",
                      params: { id: advance.id },
                    })
                  }
                >
                  <Text>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    DeleteAlert(advance.id, "Cash Advance", handleDelete);
                  }}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AdvancesPage;
