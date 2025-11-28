import DeleteAlert from "@/components/DeleteAlert";
import Loader from "@/components/Loader";
import useDelete from "@/hooks/schedules/useDelete";
import useFetchAll from "@/hooks/schedules/useFetchAll";
import { Schedule } from "@/types/globals";
import { formatTime, getDb } from "@/utils/globals";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SchedulesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { schedules, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

  if (!schedules) return <Loader />;

  return (
    <SafeAreaView className="flex-1 bg-[#f5f7fb]">
      <View className="px-4 pt-4 pb-3">
        <Text className="text-2xl font-extrabold text-[#3C492C] mb-4">Schedules</Text>
        <TouchableOpacity
          onPress={() => router.navigate("/schedules/add")}
          className="bg-[#3c6ebd] rounded-2xl py-3 px-4 flex-row items-center justify-center gap-2 shadow-md"
        >
          <MaterialIcons name="add" size={20} color="white" />
          <Text className="text-white font-semibold text-base">Add Schedule</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="px-4 space-y-4">
        {schedules.map((schedule: Schedule) => (
          <View
            key={schedule.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200"
          >
            <View className="flex-row justify-between mb-4">
              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">AM IN</Text>
                <Text className="text-[#3C492C] font-semibold">{formatTime(schedule.am_in)}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">AM OUT</Text>
                <Text className="text-[#3C492C] font-semibold">{formatTime(schedule.am_out)}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">PM IN</Text>
                <Text className="text-[#3C492C] font-semibold">{formatTime(schedule.pm_in)}</Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-sm text-gray-500">PM OUT</Text>
                <Text className="text-[#3C492C] font-semibold">{formatTime(schedule.pm_out)}</Text>
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row justify-end gap-4">
              <TouchableOpacity
                onPress={() =>
                  router.navigate({ pathname: "/schedules/edit/[id]", params: { id: schedule.id } })
                }
                className="p-2 bg-[#3c6ebd] rounded-lg"
              >
                <MaterialIcons name="edit" size={20} color="white" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => DeleteAlert(schedule.id, "Schedule", handleDelete)}
                className="p-2 bg-[#E53935] rounded-lg"
              >
                <MaterialIcons name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SchedulesPage;
