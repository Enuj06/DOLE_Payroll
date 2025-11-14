import DeleteAlert from "@/components/DeleteAlert";
import useDelete from "@/hooks/schedules/useDelete";
import useFetchAll from "@/hooks/schedules/useFetchAll";
import { getDb, getTime } from "@/utils/globals";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SchedulesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { schedules, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb] p-4">
      <View className="gap-2">
        <Text>Schedules</Text>

        <TouchableOpacity onPress={() => router.navigate("/schedules/add")}>
          <Text>Add</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-4">
        <FlatList
          data={schedules}
          keyExtractor={(schedule) => `${schedule.id}`}
          renderItem={({ item: schedule }) => (
            <View className="flex-row gap-4">
              <View>
                <Text>{`${getTime(new Date(schedule.am_in))}-${getTime(new Date(schedule.am_out))} ${getTime(new Date(schedule.pm_in))}-${getTime(new Date(schedule.pm_out))}`}</Text>
              </View>

              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() =>
                    router.navigate({
                      pathname: "/schedules/edit/[id]",
                      params: { id: schedule.id },
                    })
                  }
                >
                  <Text>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    DeleteAlert(schedule.id, "Schedule", handleDelete);
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

export default SchedulesPage;
