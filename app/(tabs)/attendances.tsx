import DeleteAlert from "@/components/DeleteAlert";
import useDelete from "@/hooks/attendances/useDelete";
import useFetchAll from "@/hooks/attendances/useFetchAll";
import { getDate, getDb } from "@/utils/globals";
import { Href, useRouter } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AttendancesPage = () => {
  const db = getDb(useSQLiteContext());
  const router = useRouter();

  const { attendances, refetch } = useFetchAll(db);
  const { handleDelete } = useDelete(db, refetch);

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

      <View className="mt-4">
        <FlatList
          data={attendances}
          keyExtractor={(attendance) => `${attendance.id}`}
          renderItem={({ item: attendance }) => (
            <View className="flex-row gap-4">
              <View>
                <Text>{getDate(new Date(attendance.date))}</Text>
              </View>

              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() =>
                    router.navigate({
                      pathname: "/attendances/edit/[id]",
                      params: { id: attendance.id },
                    })
                  }
                >
                  <Text>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    DeleteAlert(attendance.id, "Attendance", handleDelete);
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

export default AttendancesPage;
